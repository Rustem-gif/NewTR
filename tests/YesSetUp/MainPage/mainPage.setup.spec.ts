import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Main Page', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test("Check 'Search your game' input", async () => {
    const gameName = 'Fire Lightning';
    const gamePage = await tombRiches.mainPage._header.searchForGame(gameName);
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });
});
