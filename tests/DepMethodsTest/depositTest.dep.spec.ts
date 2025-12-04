import { test, expect } from '../../src/fixtures/testFixture';
import { DEPOSIT_TEST_OBJECTS } from '../../src/Data/DepositPageTestData/depositTestObjects';
import { getVpnController, type IVpnController } from '../../src/helpers/vpnControllerFactory';
import { type Locator } from '@playwright/test';

for (const countryCode of Object.keys(DEPOSIT_TEST_OBJECTS)) {
  test.describe('Deposit Methods Test Suite', { tag: '@depMethods' }, () => {
    let vpnController: IVpnController;

    test.beforeAll(() => {
      vpnController = getVpnController();
    });

    test.beforeEach(async ({ tombRiches }) => {
      await vpnController.vpnConnect(DEPOSIT_TEST_OBJECTS[countryCode]?.location || '');
      await tombRiches.page.waitForTimeout(5000);
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

      const isSofortSupported = ['NL', 'DE', 'AT'].includes(countryCode);
      if (isSofortSupported) {
        expectedMethods.push(tombRiches.cashboxPage.sofortDeposit(location));
      }
      const isEpsSupported = countryCode === 'AT';
      if (isEpsSupported) {
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
      await tombRiches.page.waitForTimeout(3000);
      await tombRiches.page.waitForLoadState('networkidle');
      await expect(tombRiches.cashboxPage.depositMethodsContainer).toHaveScreenshot(
        `DepositMethods_${countryCode}.png`,
        { maxDiffPixels: 400 }
      );
    });
  });
}
