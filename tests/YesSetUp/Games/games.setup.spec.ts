import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { qase } from 'playwright-qase-reporter';

test.describe('Games', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test(qase(406, 'Open game successfully from lobby'), { tag: '@smoke' }, async () => {
    const gamePage = await tombRiches.mainPage.openFirstTopGame();
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test(qase(567, 'Check game search feature'), { tag: '@smoke' }, async () => {
    const gameName = 'Fire Lightning';
    const gamePage = await tombRiches.mainPage.openFirstTopGame();
    await gamePage.header.searchForGame(gameName);
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });
});
