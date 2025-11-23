import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import type WelcomePack from '../../../src/PO/PromoPage/components/WelcomePack';
import { qase } from 'playwright-qase-reporter';

test.describe('Promo Page', async () => {
  let tombRiches: TombRiches;
  let welcomePack: WelcomePack;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('promoPage');
  });

  test(
    qase(492, 'Verify that promo cards are displayed on the page'),
    { tag: '@smoke' },
    async () => {
      await tombRiches.promoPage.promoBanner.first().waitFor({ state: 'visible' });
      await expect(await tombRiches.promoPage.promoBanner.count()).toBeGreaterThan(0);
    }
  );

  test(qase(490, 'Promo card check the Take It buttons'), { tag: '@smoke' }, async () => {
    await tombRiches.promoPage.takeItButton.first().click();
    await expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('cashboxPageDeposit')}`);
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });

  test(qase(491, 'Promo card check the details buttons'), { tag: '@smoke' }, async () => {
    welcomePack = await tombRiches.promoPage.openWelcomePack();
    await welcomePack.welcomePackHeader.waitFor({ state: 'visible' });
    await expect(welcomePack.welcomePackHeader).toHaveText('WELCOME PACK');
  });
});
