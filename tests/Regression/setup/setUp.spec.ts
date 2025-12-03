import { test } from '../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';

test.describe('Setup', () => {
  test('Base setup', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Performing base setup: login and save storage state');
    await test.step('Navigate to loginPage', async () => {
      await tombRiches.navTo('loginPage');
    });
    await test.step('Sign in with email mode', async () => {
      await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    });
    await test.step('Wait for top games container', async () => {
      await tombRiches.mainPage.topGamesContainer.waitFor({ state: 'visible' });
    });
    await tombRiches.mainPage.page
      .context()
      .storageState({ path: 'tests/Regression/setup/storageState.json' });
  });
});
