import { DEPOSIT_TEST_OBJECTS } from '../../src/Data/DepositPageTestData/depositTestObjects';
import { expect, test } from '../../src/fixtures/testFixture';

test.describe('Deposit Methods Test Suite', { tag: '@healthCheck' }, () => {
  for (const [code, user] of Object.entries(DEPOSIT_TEST_OBJECTS)) {
    const proxy = user.proxy;

    test.use({
      proxy: {
        server: `http://${proxy.server}`,
        username: proxy.username,
        password: proxy.password,
      },
    });
    test(`HealthCheck ${code}`, async ({ tombRiches }) => {
      await tombRiches.navTo('loginPage');
      await tombRiches.signInPage.signIn('email', {
        email: user.creds.email,
        password: user.creds.password,
      });
      await tombRiches.mainPage.header.cashboxButton.waitFor({ state: 'visible', timeout: 10000 });
      await tombRiches.navTo('cashboxPageDeposit');

      await expect(tombRiches.cashboxPage.depMethodContainer).toBeVisible({ timeout: 30000 });
    });
  }
});
