// .github/scripts/daily-report.js
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const slackWebhook = process.env.SLACK_WEBHOOK_URL;

if (!repo || !token || !slackWebhook) {
  console.error('Missing env vars GITHUB_REPOSITORY / GITHUB_TOKEN / SLACK_WEBHOOK_URL');
  process.exit(1);
}

const now = new Date();
// “Today” in UTC – adjust if you want a different timezone anchor
const startOfDay = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
);
const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

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

async function listWorkflowRuns() {
  const workflowName = encodeURIComponent('healthChecks.yml');
  const runs = await callGitHub(
    `/repos/${repo}/actions/workflows/${workflowName}/runs?per_page=50`
  );
  return runs.workflow_runs || [];
}

function isToday(dateStr) {
  const t = new Date(dateStr).getTime();
  return t >= startOfDay.getTime() && t < endOfDay.getTime();
}

async function gatherSummaries() {
  const runs = await listWorkflowRuns();
  const todayRuns = runs.filter(r => isToday(r.created_at));

  const summaries = [];

  for (const run of todayRuns) {
    try {
      const artifacts = await callGitHub(`/repos/${repo}/actions/runs/${run.id}/artifacts`);
      const artifact = artifacts.artifacts.find(a => a.name === 'test-summary');
      if (!artifact) continue;

      const zipPath = path.join(process.cwd(), `artifact-${run.id}.zip`);
      await downloadArtifactZip(artifact.archive_download_url, zipPath);

      const extractDir = path.join(process.cwd(), `artifact-${run.id}`);
      fs.mkdirSync(extractDir, { recursive: true });
      execSync(`unzip -o "${zipPath}" -d "${extractDir}"`);

      const summaryPath = path.join(extractDir, 'test_summary.json');
      if (!fs.existsSync(summaryPath)) continue;

      const content = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
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
  const dateStr = startOfDay.toISOString().slice(0, 10); // YYYY-MM-DD

  if (!summaries.length) {
    return { text: `:zzz: No Playwright runs found for ${dateStr}.` };
  }

  const totalRuns = summaries.length;
  const failedRuns = summaries.filter(s => s.status !== 'passed');
  const totalTests = summaries.reduce((acc, s) => acc + (s.total_tests || 0), 0);
  const failedTests = summaries.reduce((acc, s) => acc + (s.failed || 0), 0);
  const avgDuration = Math.round(
    summaries.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / summaries.length
  );

  const byBranch = {};
  const byEnv = {};

  for (const s of summaries) {
    const ref = s.ci?.github_ref || 'unknown';
    const env = s.ci?.env || 'unknown';

    byBranch[ref] = byBranch[ref] || { runs: 0, failed: 0 };
    byBranch[ref].runs++;
    if (s.status !== 'passed') byBranch[ref].failed++;

    byEnv[env] = byEnv[env] || { runs: 0, failed: 0 };
    byEnv[env].runs++;
    if (s.status !== 'passed') byEnv[env].failed++;
  }

  const lines = [];
  lines.push(`:bar_chart: *Playwright Daily Test Report* for *${dateStr}*`);
  lines.push(`*Runs:* ${totalRuns} (failed: ${failedRuns.length})`);
  lines.push(`*Total tests:* ${totalTests} (failed: ${failedTests})`);
  lines.push(`*Average duration:* ${avgDuration}s`);

  lines.push('\n*By branch (github_ref):*');
  for (const [ref, stats] of Object.entries(byBranch)) {
    lines.push(`- \`${ref}\`: ${stats.runs} runs (${stats.failed} failed)`);
  }

  lines.push('\n*By env:*');
  for (const [env, stats] of Object.entries(byEnv)) {
    lines.push(`- \`${env}\`: ${stats.runs} runs (${stats.failed} failed)`);
  }

  if (failedRuns.length) {
    lines.push('\n*Example failures (up to 5):*');
    failedRuns.slice(0, 5).forEach(s => {
      const url = s._workflow_run?.url;
      lines.push(
        `- \`${s.status}\`, tests: ${s.passed}/${s.total_tests} passed, ` +
          `finished at \`${s.end_time || s.start_time}\`, <${url}|open run>`
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
    console.log('Posted daily report to Slack.');
  } catch (err) {
    console.error('Failed to post daily report:', err);
    process.exit(1);
  }
})();
