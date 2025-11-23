import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { qase } from 'playwright-qase-reporter';

test.describe('Cashbox', async () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('cashboxPageDeposit');
  });

  test(qase(413, 'Open cashier'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.header.clickOn(tombRiches.mainPage.header.cashboxButton);
    await expect(tombRiches.CashboxPage.withdrawButton).toBeVisible();
    await expect(tombRiches.CashboxPage.historyButton).toBeVisible();
    await expect(tombRiches.CashboxPage.depositButton).toBeVisible();
  });

  test(qase(414, 'Verify Cashier Tabs'), { tag: '@smoke' }, async () => {
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });
});
