import { test, expect } from '../../src/fixtures/testFixture';
import { DEPOSIT_TEST_OBJECTS } from '../../src/Data/DepositPageTestData/depositTestObjects';
import { VpnController } from '../../src/helpers/vpnController';
import { type Locator } from '@playwright/test';

for (const countryCode of Object.keys(DEPOSIT_TEST_OBJECTS)) {
  test.describe('Deposit Methods Test Suite', { tag: '@depMethods' }, () => {
    let vpnController: VpnController;

    test.beforeAll(() => {
      vpnController = new VpnController();
    });

    test.beforeEach(async () => {
      await vpnController.vpnConnect(DEPOSIT_TEST_OBJECTS[countryCode]?.location || '');
      await vpnController.sleepVPN(5000);
    });

    test.afterEach(async () => {
      await vpnController.vpnDisconnect();
    });

    test(`Deposit Methods Test for ${countryCode}`, async ({ tombRiches }) => {
      const countryData = DEPOSIT_TEST_OBJECTS[countryCode];
      if (!countryData) {
        throw new Error(`No test data for country code: ${countryCode}`);
      }

      await tombRiches.navTo('loginPage');
      await tombRiches.signInPage.signIn('email', countryData.creds);
      await tombRiches.mainPage.header.cashboxButton.waitFor({ state: 'visible', timeout: 10000 });
      await tombRiches.navTo('cashboxPageDeposit');
      await tombRiches.page.waitForLoadState('networkidle');

      const location = countryData.code;
      const expectedMethods: Locator[] = [
        tombRiches.cashboxPage.creditCards(location),
        tombRiches.cashboxPage.applePay(location),
        tombRiches.cashboxPage.googlePay(location),
        tombRiches.cashboxPage.openBanking(location),
        tombRiches.cashboxPage.cryptoDeposit(location),
      ];

      if (countryCode === 'NL' || countryCode === 'DE' || countryCode === 'AT') {
        expectedMethods.push(tombRiches.cashboxPage.sofortDeposit(location));
      }
      if (countryCode === 'AT') {
        expectedMethods.push(tombRiches.cashboxPage.epsBanking(location));
      }

      for (const methodLocator of expectedMethods) {
        await expect(methodLocator).toBeVisible();
      }
    });

    test(`Screenshot testing of the deposit page for ${countryCode}`, async ({ tombRiches }) => {
      const countryData = DEPOSIT_TEST_OBJECTS[countryCode];
      if (!countryData) {
        throw new Error(`No test data for country code: ${countryCode}`);
      }
      await tombRiches.navTo('loginPage');
      await tombRiches.signInPage.signIn('email', countryData.creds);
      await tombRiches.mainPage.header.cashboxButton.waitFor({ state: 'visible', timeout: 10000 });
      await tombRiches.navTo('cashboxPageDeposit');
      await tombRiches.page.waitForLoadState('networkidle');
      await expect(tombRiches.cashboxPage.depositMethodsContainer).toHaveScreenshot(
        `DepositMethods_${countryCode}.png`
      );
    });
  });
}
