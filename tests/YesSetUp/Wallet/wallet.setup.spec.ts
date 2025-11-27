import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Wallet', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to walletPage', async () => {
      await tombRiches.navTo('walletPage');
    });
  });

  test('Check "Deposit" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing deposit button in wallet page');
    await test.step('Click on deposit button', async () => {
      await tombRiches.clickOn(tombRiches.walletPage.depositButton);
    });
    await expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageDeposit'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });

  test('Check "Withdraw" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing withdraw button in wallet page');
    await test.step('Click on withdraw button', async () => {
      await tombRiches.clickOn(tombRiches.walletPage.withdrawButton);
    });
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageWithdraw'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });
});
