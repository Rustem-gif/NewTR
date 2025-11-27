import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Registration', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to registrationPage', async () => {
      await tombRiches.navTo('registrationPage');
    });
  });

  test('Check registration (with email)', { tag: '@smoke' }, async () => {
    qase.comment('Testing user registration with email');
    const user = tombRiches.userBuilder.withRandomEmail().withPassword('TestPassword123!').build();

    await test.step('Register new user', async () => {
      await tombRiches.signUpPage.registerNewUser(user);
    });
    await expect(tombRiches.CashboxPage.depMethodContainer).toBeVisible();
    expect(await tombRiches.CashboxPage.getDepMethodCount()).toBeGreaterThan(0);
  });

  test('Registration with existing email', { tag: '@smoke' }, async () => {
    qase.comment('Testing registration with existing email to check error handling');
    const user = tombRiches.userBuilder
      .withEmail('ross@kingbilly.xyz')
      .withPassword('TestPassword123!')
      .build();

    await test.step('Register new user', async () => {
      await tombRiches.signUpPage.registerNewUser(user);
    });
    await expect(tombRiches.signUpPage.emailInputErrorUsed).toBeVisible();
  });
});
