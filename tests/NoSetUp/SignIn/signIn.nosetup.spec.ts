import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Log in', () => {
  let tombRiches: TombRiches;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('loginPage');
  });

  test('Check "Sign in" functionality via email', async () => {
    await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
  });

  test.fixme('Check "Sign in" functionality via mobile number', async () => {
    await tombRiches.signInPage.signIn('phone', tombRiches.users.MAIN_USER!);
    await expect(tombRiches.mainPage.header.cashboxButton).toBeVisible();
  });
});
