import { test } from '../../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';

test.describe('Cashbox', async () => {
  test.beforeEach(async ({ tombRiches }) => {
    await test.step('Navigate to cashboxPageDeposit', async () => {
      await tombRiches.navTo('cashboxPageDeposit');
    });
  });

  test('Open cashier', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing opening cashier from header');
    await test.step('Click on cashbox button', async () => {
      await tombRiches.mainPage.header.clickOn(tombRiches.mainPage.header.cashboxButton);
    });
    await expect(tombRiches.CashboxPage.withdrawButton).toBeVisible();
    await expect(tombRiches.CashboxPage.historyButton).toBeVisible();
    await expect(tombRiches.CashboxPage.depositButton).toBeVisible();
  });

  test('Verify Cashier Tabs', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Verifying visibility of cashier payment tabs');
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });
});
