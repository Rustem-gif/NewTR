import { test as setup } from '@playwright/test';
import TombRiches from '../../src/PageManager/TombRiches';

setup.describe('Setup', () => {
  let tombRiches: TombRiches;
  setup('Base setup', async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('loginPage');
    await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    await tombRiches.mainPage.topGamesContainer.waitFor({ state: 'visible' });
    await tombRiches.mainPage.page
      .context()
      .storageState({ path: 'tests/setup/storageState.json' });
  });
});
