import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Log in', () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to loginPage', async () => {
      await tombRiches.navTo('loginPage');
    });
  });

  test('Check "Sign in" functionality via email', { tag: '@smoke' }, async () => {
    qase.comment('Testing sign in functionality via email');
    await test.step('Sign in with email mode', async () => {
      await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    });
    await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
  });

  test.fixme('Check "Sign in" functionality via mobile number', { tag: '@smoke' }, async () => {
    qase.comment('Testing sign in functionality via phone (fixme)');
    await test.step('Sign in with phone mode', async () => {
      await tombRiches.signInPage.signIn('phone', tombRiches.users.MAIN_USER!);
    });
    await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
  });
});
