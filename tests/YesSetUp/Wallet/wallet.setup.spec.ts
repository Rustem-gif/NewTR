import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { qase } from 'playwright-qase-reporter';

test.describe('Wallet', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('walletPage');
  });

  test(qase(391, 'Check "Deposit" button'), { tag: '@smoke' }, async () => {
    await tombRiches.clickOn(tombRiches.walletPage.depositButton);
    await expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageDeposit'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });

  test(qase(501, 'Check "Withdraw" button'), { tag: '@smoke' }, async () => {
    await tombRiches.clickOn(tombRiches.walletPage.withdrawButton);
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageWithdraw'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });
});
