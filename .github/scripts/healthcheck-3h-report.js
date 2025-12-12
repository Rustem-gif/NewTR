// .github/scripts/healthcheck-3h-report.js
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const repo = process.env.GITHUB_REPOSITORY; // e.g. owner/repo
const token = process.env.GITHUB_TOKEN;
const slackWebhook = process.env.SLACK_WEBHOOK_URL;

if (!repo || !token || !slackWebhook) {
  console.error('Missing env vars GITHUB_REPOSITORY / GITHUB_TOKEN / SLACK_WEBHOOK_URL');
  process.exit(1);
}

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
const now = new Date();

async function callGitHub(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${body}`);
  }
  return res.json();
}

async function downloadArtifactZip(url, destPath) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Download artifact error ${res.status}: ${body}`);
  }
  const buffer = await res.buffer();
  fs.writeFileSync(destPath, buffer);
}

async function listRecentWorkflowRuns() {
  // limit to the named workflow to avoid noise
  const workflowName = encodeURIComponent('healthChecks.yml');
  const runs = await callGitHub(
    `/repos/${repo}/actions/workflows/${workflowName}/runs?per_page=30`
  );
  return runs.workflow_runs || [];
}

function withinLastThreeHours(dateStr) {
  const t = new Date(dateStr).getTime();
  return now.getTime() - t <= THREE_HOURS_MS;
}

async function gatherSummaries() {
  const runs = await listRecentWorkflowRuns();
  const recentRuns = runs.filter(r => withinLastThreeHours(r.created_at));

  const summaries = [];

  for (const run of recentRuns) {
    try {
      const artifacts = await callGitHub(`/repos/${repo}/actions/runs/${run.id}/artifacts`);
      const artifact = artifacts.artifacts.find(a => a.name === 'test-summary');
      if (!artifact) continue;

      const zipPath = path.join(process.cwd(), `artifact-${run.id}.zip`);
      await downloadArtifactZip(artifact.archive_download_url, zipPath);

      // unzip just test_summary.json (zip is small – you can use system unzip)
      const extractDir = path.join(process.cwd(), `artifact-${run.id}`);
      fs.mkdirSync(extractDir, { recursive: true });
      require('child_process').execSync(`unzip -o "${zipPath}" -d "${extractDir}"`);

      const summaryPath = path.join(extractDir, 'test_summary.json');
      if (!fs.existsSync(summaryPath)) continue;

      const content = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
      // Attach run metadata just in case
      content._workflow_run = {
        id: run.id,
        url: run.html_url,
        status: run.conclusion,
        created_at: run.created_at,
      };
      summaries.push(content);
    } catch (err) {
      console.warn(`Failed to process run ${run.id}: ${err.message}`);
    }
  }

  return summaries;
}

function buildSlackPayload(summaries) {
  if (!summaries.length) {
    return {
      text: ':warning: No Playwright healthcheck runs found in the last 3 hours.',
    };
  }

  const failed = summaries.filter(s => s.status !== 'passed');
  const ok = failed.length === 0;

  const statusEmoji = ok ? ':white_check_mark:' : ':x:';
  const statusText = ok ? 'ALL HEALTHCHECKS PASSED' : 'SOME HEALTHCHECKS FAILED';

  const total = summaries.length;

  // Choose the latest by end_time or start_time
  summaries.sort(
    (a, b) =>
      new Date(b.end_time || b.start_time).getTime() -
      new Date(a.end_time || a.start_time).getTime()
  );
  const latest = summaries[0];

  const lines = [];
  lines.push(`${statusEmoji} *Playwright healthchecks in last 3 hours*`);
  lines.push(`*Status:* ${statusText}`);
  lines.push(`*Total runs:* ${total}`);
  lines.push(`*Failed runs:* ${failed.length}`);

  if (latest) {
    const runUrl = latest._workflow_run?.url || '(no link)';
    lines.push(
      `*Latest run:* status \`${latest.status}\`, tests: ${latest.passed}/${latest.total_tests} passed, ` +
        `finished at \`${latest.end_time || latest.start_time}\`, <${runUrl}|open run>`
    );
  }

  if (failed.length) {
    lines.push('\n*Failures (up to 5):*');
    failed.slice(0, 5).forEach(f => {
      const runUrl = f._workflow_run?.url || '';
      lines.push(
        `- status \`${f.status}\`, tests: ${f.passed}/${f.total_tests} passed, ` +
          `finished at \`${f.end_time || f.start_time}\`, <${runUrl}|open run>`
      );
    });
  }

  return { text: lines.join('\n') };
}

async function postToSlack(payload) {
  const res = await fetch(slackWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Slack error ${res.status}: ${body}`);
  }
}

(async () => {
  try {
    const summaries = await gatherSummaries();
    const payload = buildSlackPayload(summaries);
    await postToSlack(payload);
    console.log('Posted healthcheck summary to Slack.');
  } catch (err) {
    console.error('Failed to post healthcheck summary:', err);
    process.exit(1);
  }
})();
