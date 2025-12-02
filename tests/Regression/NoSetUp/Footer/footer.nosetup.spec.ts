import { test } from '../../../../src/fixtures/testFixture';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../../src/utils/qaseHelper';
import { CBG_LICENSE_URL } from '../../../../src/Data/contants';
import { EXPECTED_TEXTS } from '../../../../src/Data/expectedTextResults/TextManager';

test.describe('Footer', () => {
  test.beforeEach(async ({ tombRiches }) => {
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
  });

  test('License', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing footer license link functionality');
    await test.step('Click on license button', async () => {
      await tombRiches.mainPage.footer.cbgLicenseButton.click();
    });
    const currentPageUrl = tombRiches.page.url();
    await expect(currentPageUrl).toContain(CBG_LICENSE_URL);
  });

  test('Online chat support', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing online chat support functionality');
    await test.step('Click on intercom app', async () => {
      await tombRiches.clickOn(tombRiches.intercomApp);
    });
    await test.step('Scroll intercom body into view', async () => {
      await tombRiches.intercomBody.scrollIntoViewIfNeeded();
    });
    await expect(tombRiches.intercomBody).toBeVisible();
  });

  test('Click "Terms of Service"', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing Terms of Service footer link and content verification');
    await test.step('Open footer link termsOfService', async () => {
      await tombRiches.mainPage.footer.openFooterLink('termsOfService');
    });
    await expect(tombRiches.termsOfService.textContent).toBeVisible();

    const pageContent = await tombRiches.termsOfService.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.termsOfService);
  });

  test('Click "Responsible Gaming"', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing Responsible Gaming footer link and content verification');
    await test.step('Open footer link responsibleGaming', async () => {
      await tombRiches.mainPage.footer.openFooterLink('responsibleGaming');
    });
    await expect(tombRiches.responsibleGambling.textContent).toBeVisible();

    const pageContent = await tombRiches.responsibleGambling.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.responsibleGaming);
  });

  test('Click "Self-Exclusion"', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing Self-Exclusion footer link and content verification');
    await test.step('Open footer link selfExclusion', async () => {
      await tombRiches.mainPage.footer.openFooterLink('selfExclusion');
    });
    await expect(tombRiches.selfExclusion.textContent).toBeVisible();

    const pageContent = await tombRiches.selfExclusion.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.selfExclusion);
  });

  test(
    'Click "Privacy & Management of Personal Data"',
    { tag: '@smoke' },
    async ({ tombRiches }) => {
      qase.comment(
        'Testing Privacy & Management of Personal Data footer link and content verification'
      );
      await test.step('Open footer link privacyAndManagementOfPersonalData', async () => {
        await tombRiches.mainPage.footer.openFooterLink('privacyAndManagementOfPersonalData');
      });
      await expect(tombRiches.privacyAndManagementOfPersonalData.textContent).toBeVisible();

      const pageContent =
        await tombRiches.privacyAndManagementOfPersonalData.textContent.textContent();
      expect(pageContent).toEqual(EXPECTED_TEXTS.privacyAndManagementOfPersonalData);
    }
  );

  test('Accounts, Payouts & Bonuses', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing Accounts, Payouts & Bonuses footer link and content verification');
    await test.step('Open footer link accountsPayoutsAndBonuses', async () => {
      await tombRiches.mainPage.footer.openFooterLink('accountsPayoutsAndBonuses');
    });
    await expect(tombRiches.accountsPayoutsAndBonuses.textContent).toBeVisible();

    const pageContent = await tombRiches.accountsPayoutsAndBonuses.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.accountsPayoutsAndBonuses);
  });

  test('KYC Policies', { tag: '@smoke' }, async ({ tombRiches }) => {
    qase.comment('Testing KYC Policies footer link and content verification');
    await test.step('Open footer link kycPolicies', async () => {
      await tombRiches.mainPage.footer.openFooterLink('kycPolicies');
    });
    await expect(tombRiches.kycPolicies.textContent).toBeVisible();

    const pageContent = await tombRiches.kycPolicies.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.kycPolicies);
  });
});
