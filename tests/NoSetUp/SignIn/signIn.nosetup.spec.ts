import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { qase } from 'playwright-qase-reporter';

test.describe('Log in', () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('loginPage');
  });

  test(qase(380, 'Check "Sign in" functionality via email'), { tag: '@smoke' }, async () => {
    await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
  });

  test.fixme(
    qase(409, 'Check "Sign in" functionality via mobile number'),
    { tag: '@smoke' },
    async () => {
      await tombRiches.signInPage.signIn('phone', tombRiches.users.MAIN_USER!);
      await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
    }
  );
});
