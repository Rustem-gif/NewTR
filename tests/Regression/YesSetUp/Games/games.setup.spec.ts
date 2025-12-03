import { test } from '../../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';

test.describe('Games', () => {
  test.beforeEach(async ({ tombRiches }) => {
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
  });

  test('Open game successfully from lobby', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing opening a game from the lobby');
    const gamePage = await test.step('Open first top game', async () => {
      return await tombRiches.mainPage.openFirstTopGame();
    });
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test('Check game search feature', { tag: '@smoke' }, async ({ tombRiches }) => {
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
