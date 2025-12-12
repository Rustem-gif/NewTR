// name: scripts/ensure-summary.js
const fs = require('fs');
const path = require('path');

const out = path.resolve(process.cwd(), 'test_summary.json');
if (fs.existsSync(out)) {
  console.log('test_summary.json already exists');
  process.exit(0);
}

const summary = {
  suite: 'playwright',
  status: 'failed',
  total_tests: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  start_time: process.env.GITHUB_RUN_STARTED_AT || new Date().toISOString(),
  end_time: new Date().toISOString(),
  duration_seconds: 0,
  ci: {
    github_run_id: process.env.GITHUB_RUN_ID,
    github_run_number: process.env.GITHUB_RUN_NUMBER,
    github_workflow: process.env.GITHUB_WORKFLOW,
    github_sha: process.env.GITHUB_SHA,
    github_ref: process.env.GITHUB_REF,
    github_actor: process.env.GITHUB_ACTOR,
    github_repo: process.env.GITHUB_REPOSITORY,
    env: process.env.TEST_ENV || 'unknown',
  },
  note: 'Auto-generated failed summary because test_summary.json was not produced by Playwright.',
};

try {
  fs.writeFileSync(out, JSON.stringify(summary, null, 2));
  console.log('Wrote fallback test_summary.json');
  process.exit(0);
} catch (e) {
  console.error('Failed to write fallback summary', e);
  process.exit(2);
}
