import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Cashbox', async () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('cashboxPage');
  });

  test('Open cashier', async () => {
    await tombRiches.mainPage.header.clickOn(tombRiches.mainPage.header.cashboxButton);
    await expect(tombRiches.CashboxPage.withdrawButton).toBeVisible();
    await expect(tombRiches.CashboxPage.historyButton).toBeVisible();
    await expect(tombRiches.CashboxPage.depositButton).toBeVisible();
  });

  test('Verify Cashier Tabs', async () => {
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });
});
