import { test as setup } from '@playwright/test';
import TombRiches from '../../src/PageManager/TombRiches';
import { MAIN_USER } from '../../src/Data/Users';

setup.describe('Setup', () => {
  let tombRiches: TombRiches;
  setup('Base setup', async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('loginPage');
    await tombRiches.signInPage.signIn(MAIN_USER);
    await tombRiches.mainPage.page
      .context()
      .storageState({ path: 'tests/setup/storageState.json' });
  });
});
