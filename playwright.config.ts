import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const generateCustomLayoutAsync = async (): Promise<Record<string, unknown>> => {
  // Add your custom layout logic here
  return {};
};

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: 3,

  workers: 3,

  reporter: [
    ['html'],
    ['list'],
    // [
    //   'playwright-qase-reporter',
    //   {
    //     debug: true,
    //     mode: 'testops',
    //     logging: true,
    //     testops: {
    //       api: {
    //         token: '2b3e65ab1ee17f1440a13c94b9d1da5429f590fdbcc8d080ddc41268ae50305b',
    //       },

    //       project: 'AUTOMATION',
    //       uploadAttachments: true,
    //       run: {
    //         complete: true,
    //         title: process.env.TEST_RUN_TITLE || 'TR Automated Run',
    //       },
    //     },
    //   },
    // ],

    [
      './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
      {
        slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: ['test-reporter', 'kb-payment'],
        sendResults: 'always',
        layoutAsync: generateCustomLayoutAsync,
        showInThread: true,
        sendCustomBlocksInThreadAfterIndex: 3, // Only first 3 blocks in main message, rest in thread
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
    { name: 'setup', testMatch: '**/setup/*.spec.ts', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'YesSetUp',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/Regression/setup/storageState.json',
      },
      testMatch: '**/*.setup.spec.ts',
      dependencies: ['setup'],
    },

    {
      name: 'NoSetUp',
      testMatch: '**/*.nosetup.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'DepMethods',
      testMatch: '**/DepMethodsTest/*.dep.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
