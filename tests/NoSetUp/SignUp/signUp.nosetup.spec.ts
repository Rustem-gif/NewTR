import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';

test.describe('Registration', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('registrationPage');
  });

  test('Check registration (with email)', async () => {
    const user = tombRiches.userBuilder
      .withRandomEmail()
      .withPassword('TestPassword123!')
      .withFirstName('Test')
      .withLastName('User')
      .withRegion('TestRegion')
      .withCity('TestCity')
      .withAddress('123 Test St')
      .withZipCode('12345')
      .withBirthDate('1990', 'Jan', '1')
      .build();

    await tombRiches.signUpPage.registerNewUser(user);
    await expect(tombRiches.CashboxPage.depMethodContainer).toBeVisible();
    expect(await tombRiches.CashboxPage.getDepMethodCount()).toBeGreaterThan(0);
  });

  test('Registration with existing email', async () => {
    const user = tombRiches.userBuilder
      .withEmail('ross@kingbilly.xyz')
      .withPassword('TestPassword123!')
      .withFirstName('Test')
      .withLastName('User')
      .withRegion('TestRegion')
      .withCity('TestCity')
      .withAddress('123 Test St')
      .withZipCode('12345')
      .withBirthDate('1990', 'Jan', '1')
      .build();

    await tombRiches.signUpPage.registerNewUser(user);
    await expect(tombRiches.signUpPage.emailInputErrorUsed).toBeVisible();
  });
});
