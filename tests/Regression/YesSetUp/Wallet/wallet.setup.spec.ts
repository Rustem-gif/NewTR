import { test } from '../../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';

test.describe('Wallet', () => {
  test.beforeEach(async ({ tombRiches }) => {
    await test.step('Navigate to walletPage', async () => {
      await tombRiches.navTo('walletPage');
    });
  });

  test('Check "Deposit" button', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing deposit button in wallet page');
    await test.step('Click on deposit button', async () => {
      await tombRiches.clickOn(tombRiches.walletPage.depositButton);
    });
    await expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageDeposit'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });

  test('Check "Withdraw" button', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing withdraw button in wallet page');
    await test.step('Click on withdraw button', async () => {
      await tombRiches.clickOn(tombRiches.walletPage.withdrawButton);
    });
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('cashboxPageWithdraw'));
    await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible();
  });
});
