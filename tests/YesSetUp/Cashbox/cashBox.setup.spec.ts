import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Cashbox', async () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to cashboxPageDeposit', async () => {
      await tombRiches.navTo('cashboxPageDeposit');
    });
  });

  test('Open cashier', { tag: '@smoke' }, async () => {
    qase.comment('Testing opening cashier from header');
    await test.step('Click on cashbox button', async () => {
      await tombRiches.mainPage.header.clickOn(tombRiches.mainPage.header.cashboxButton);
    });
    await expect(tombRiches.CashboxPage.withdrawButton).toBeVisible();
    await expect(tombRiches.CashboxPage.historyButton).toBeVisible();
    await expect(tombRiches.CashboxPage.depositButton).toBeVisible();
  });

  test('Verify Cashier Tabs', { tag: '@smoke' }, async () => {
    qase.comment('Verifying visibility of cashier payment tabs');
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });
});
