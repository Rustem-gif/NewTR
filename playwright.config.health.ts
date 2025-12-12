import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: 3,

  workers: 3,

  reporter: [
    ['list'],
    ['./playwright.reporter.summary.ts'],
    [
      'playwright-qase-reporter',
      {
        // debug: true,
        mode: 'testops',
        logging: true,
        testops: {
          api: {
            token: '2b3e65ab1ee17f1440a13c94b9d1da5429f590fdbcc8d080ddc41268ae50305b',
          },
          project: 'HC',
          uploadAttachments: true,
          run: {
            complete: true,
            title: process.env.TEST_RUN_TITLE || 'TR Automated Run',
          },
        },
      },
    ],
  ],

  use: {
    baseURL: 'https://tombriches1.com/en',
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'healthChecks',
      testMatch: '**/HealthChecks/*.health.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
