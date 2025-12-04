import { defineConfig, devices } from '@playwright/test';
import generateCustomLayoutAsync from './my_custom_layout';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: 3,

  workers: 3,

  reporter: [
    ['html'],
    ['list'],
    [
      './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
      {
        slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: ['test-reporter', 'tr-payment'],
        sendResults: 'always',
        layoutAsync: generateCustomLayoutAsync,
        showInThread: true,
        sendCustomBlocksInThreadAfterIndex: 3,
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
      name: 'DepMethods',
      testMatch: '**/DepMethodsTest/*.dep.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  expect: {
    toHaveScreenshot: {
      threshold: 0.3,
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },
});
