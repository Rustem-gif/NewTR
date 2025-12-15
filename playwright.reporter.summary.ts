// playwright.reporter.summary.ts
import type { Reporter, FullConfig, Suite } from '@playwright/test/reporter';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

class JsonSummaryReporter implements Reporter {
  private startTime: Date = new Date();
  private rootSuite?: Suite;
  private total = 0;
  private passed = 0;
  private failed = 0;
  private skipped = 0;

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = new Date();
    this.rootSuite = suite;
  }

  private computeFinalStats() {
    if (!this.rootSuite) return;

    for (const test of this.rootSuite.allTests()) {
      this.total += 1;
      const outcome = test.outcome();
      if (outcome === 'skipped') this.skipped += 1;
      else if (outcome === 'expected' || outcome === 'flaky') this.passed += 1;
      else this.failed += 1;
    }
  }

  async onEnd() {
    const endTime = new Date();
    const durationSeconds = Math.round((endTime.getTime() - this.startTime.getTime()) / 1000);

    this.computeFinalStats();

    const summary = {
      suite: 'playwright',
      status: this.failed > 0 ? 'failed' : 'passed',
      total_tests: this.total,
      passed: this.passed,
      failed: this.failed,
      skipped: this.skipped,
      start_time: this.startTime.toISOString(),
      end_time: endTime.toISOString(),
      duration_seconds: durationSeconds,
      // CI-related metadata will be filled in by environment variables in GitHub Actions:
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
    };

    const outPath = resolve(process.cwd(), 'test_summary.json');
    writeFileSync(outPath, JSON.stringify(summary, null, 2));
    console.log(`::notice::Wrote Playwright summary to ${outPath}`);
  }
}

export default JsonSummaryReporter;
