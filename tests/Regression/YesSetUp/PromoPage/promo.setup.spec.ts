import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';
import TombRiches from '../../../../src/PageManager/TombRiches';
import type WelcomePack from '../../../../src/PO/PromoPage/components/WelcomePack';
import { test } from '../../../../src/fixtures/testFixture';

test.describe('Promo Page', () => {
  let tombRiches: TombRiches;
  let welcomePack: WelcomePack;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to promoPage', async () => {
      await tombRiches.navTo('promoPage');
    });
  });

  test('Verify that promo cards are displayed on the page', { tag: '@smoke' }, async () => {
    qase.comment('Verifying promo cards are displayed on promo page');
    await tombRiches.promoPage.promoBanner.first().waitFor({ state: 'visible' });
    await expect(await tombRiches.promoPage.promoBanner.count()).toBeGreaterThan(0);
  });

  test('Promo card check the Take It buttons', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing promo card take it button navigation');
    await test.step('Click on take it button', async () => {
      await tombRiches.promoPage.takeItButton.first().click();
    });
    await expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('cashboxPageDeposit')}`);
    await expect(tombRiches.CashboxPage.creditCards('de')).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay('de')).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay('de')).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit('de')).toBeVisible();
  });

  test('Promo card check the details buttons', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing promo card details button functionality');
    welcomePack = await test.step('Open welcome pack', async () => {
      return await tombRiches.promoPage.openWelcomePack();
    });
    await welcomePack.welcomePackHeader.waitFor({ state: 'visible' });
    await expect(welcomePack.welcomePackHeader).toHaveText('WELCOME PACK');
  });
});
