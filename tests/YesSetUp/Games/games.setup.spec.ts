import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Games', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
  });

  test('Open game successfully from lobby', { tag: '@smoke' }, async () => {
    qase.comment('Testing opening a game from the lobby');
    const gamePage = await test.step('Open first top game', async () => {
      return await tombRiches.mainPage.openFirstTopGame();
    });
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test('Check game search feature', { tag: '@smoke' }, async () => {
    qase.comment('Testing game search functionality');
    const gameName = 'Fire Lightning';
    const gamePage = await test.step('Open first top game', async () => {
      return await tombRiches.mainPage.openFirstTopGame();
    });
    await test.step(`Search for game ${gameName}`, async () => {
      await gamePage.header.searchForGame(gameName);
    });
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });
});
