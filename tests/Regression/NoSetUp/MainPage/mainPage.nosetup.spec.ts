import { test } from '../../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';
import { SLIDER_MAPPING } from '../../../../src/PO/MainPage/components/GameCategorySlider';

test.describe('Main Page', () => {
  test.beforeEach(async ({ tombRiches }) => {
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
  });

  test('Main Page Load and Initial UI Check', { tag: '@smoke' }, async ({ tombRiches }) => {
    await test.step('Verify main page UI elements', async () => {
      await tombRiches.mainPage.verifyMainPageUIElements();
    });
  });

  for (const category of Object.keys(SLIDER_MAPPING)) {
    test(
      `Game Categories Slider Navigation: ${category}`,
      { tag: ['@smoke', `@${category}`] },
      async ({ tombRiches }) => {
        qase.comment(`Testing game category slider navigation for ${category}`);
        await test.step(`Select category ${category} and verify heading`, async () => {
          await tombRiches.mainPage.gameCategorySlider.selectCategoryAndVerifyHeading(
            category as keyof typeof SLIDER_MAPPING
          );
        });
        await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
        await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
      }
    );
  }
});
