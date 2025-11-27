import { test as setup } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import TombRiches from '../../src/PageManager/TombRiches';

setup.describe('Setup', () => {
  let tombRiches: TombRiches;
  setup('Base setup', { tag: '@smoke' }, async ({ page }) => {
    qase.comment('Performing base setup: login and save storage state');
    tombRiches = new TombRiches(page);
    await setup.step('Navigate to loginPage', async () => {
      await tombRiches.navTo('loginPage');
    });
    await setup.step('Sign in with email mode', async () => {
      await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    });
    await setup.step('Wait for top games container', async () => {
      await tombRiches.mainPage.topGamesContainer.waitFor({ state: 'visible' });
    });
    await tombRiches.mainPage.page
      .context()
      .storageState({ path: 'tests/setup/storageState.json' });
  });
});
