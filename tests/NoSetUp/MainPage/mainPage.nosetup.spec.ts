import test from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Main Page', () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });
  test('Main Page Load and Initial UI Check', async () => {
    await tombRiches.mainPage.verifyMainPageUIElements();
  });
});
