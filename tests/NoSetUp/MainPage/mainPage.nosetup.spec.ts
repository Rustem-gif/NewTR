import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { SLIDER_MAPPING } from '../../../src/PO/MainPage/components/GameCategorySlider';
import { qase } from 'playwright-qase-reporter';

test.describe('Main Page', () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });
  test(qase(429, 'Main Page Load and Initial UI Check'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.verifyMainPageUIElements();
  });

  for (const category of Object.keys(SLIDER_MAPPING)) {
    test(
      `Game Categories Slider Navigation: ${category}`,
      { tag: ['@smoke', `@${category}`] },
      async () => {
        await tombRiches.mainPage.gameCategorySlider.selectCategoryAndVerifyHeading(
          category as keyof typeof SLIDER_MAPPING
        );
        await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
        await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
      }
    );
  }
});
