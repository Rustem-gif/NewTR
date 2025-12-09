import { Locator } from '@playwright/test';
import { expect, test } from '../../src/fixtures/testFixture';

test.describe('Deposit Methods Test Suite', { tag: '@healthCheck' }, () => {
  test(`Deposit Methods Test for `, async ({ tombRiches }) => {
    await tombRiches.navTo('loginPage');
    await tombRiches.signInPage.signIn('email', tombRiches.users.MAIN_USER!);
    await tombRiches.mainPage.header.cashboxButton.waitFor({ state: 'visible', timeout: 10000 });
    await tombRiches.navTo('cashboxPageDeposit');
    await tombRiches.page.waitForLoadState('networkidle');

    const expectedMethods: Locator[] = [
      tombRiches.cashboxPage.creditCards('de'),
      tombRiches.cashboxPage.applePay('de'),
      tombRiches.cashboxPage.googlePay('de'),
      tombRiches.cashboxPage.openBanking('de'),
      tombRiches.cashboxPage.cryptoDeposit('de'),
    ];

    // const isSofortSupported = ['NL', 'DE', 'AT'].includes(countryCode);
    // if (isSofortSupported) {
    //     expectedMethods.push(tombRiches.cashboxPage.sofortDeposit(location));
    // }
    // const isEpsSupported = countryCode === 'AT';
    // if (isEpsSupported) {
    //     expectedMethods.push(tombRiches.cashboxPage.epsBanking(location));
    // }

    for (const methodLocator of expectedMethods) {
      await expect.soft(methodLocator).toBeVisible();
    }
  });
});
