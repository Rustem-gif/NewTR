import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { qase } from 'playwright-qase-reporter';

test.describe('Registration', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('registrationPage');
  });

  test(qase(451, 'Check registration (with email)'), { tag: '@smoke' }, async () => {
    const user = tombRiches.userBuilder.withRandomEmail().withPassword('TestPassword123!').build();

    await tombRiches.signUpPage.registerNewUser(user);
    await expect(tombRiches.CashboxPage.depMethodContainer).toBeVisible();
    expect(await tombRiches.CashboxPage.getDepMethodCount()).toBeGreaterThan(0);
  });

  test(qase(405, 'Registration with existing email'), { tag: '@smoke' }, async () => {
    const user = tombRiches.userBuilder
      .withEmail('ross@kingbilly.xyz')
      .withPassword('TestPassword123!')
      .build();

    await tombRiches.signUpPage.registerNewUser(user);
    await expect(tombRiches.signUpPage.emailInputErrorUsed).toBeVisible();
  });
});
