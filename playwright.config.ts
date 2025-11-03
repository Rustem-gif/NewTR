import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: 0,

  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'https://tombriches1.com/en',

    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'setup', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'NoSetUp',
      testMatch: '**/*.nosetup.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'YesSetUp',
      use: { ...devices['Desktop Chrome'], storageState: 'tests/setup/storageState.json' },
      testMatch: '**/*.setup.spec.ts',
      dependencies: ['setup'],
    },
  ],
});
