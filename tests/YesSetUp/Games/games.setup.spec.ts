import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Games', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test('Open game successfully from lobby', async () => {
    const gamePage = await tombRiches.mainPage.openFirstTopGame();
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test('Check game search feature', async () => {
    const gameName = 'Fire Lightning';
    const gamePage = await tombRiches.mainPage.openFirstTopGame();
    await gamePage.header.searchForGame(gameName);
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });
});
