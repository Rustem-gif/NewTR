import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { CBG_LICENSE_URL } from '../../../src/Data/contants';
import { TERMS_AND_CONDITIONS_TEXT } from '../../../src/Data/expectedTextResults/termsAndContidions';
import { RESPONSIBLE_GAMBLING_TEXT } from '../../../src/Data/expectedTextResults/responsibleGambling';
import { SELF_EXCLUSION_TEXT } from '../../../src/Data/expectedTextResults/selfExclusionText';
import { PRIVACY_AND_MANAGEMENT_TEXT } from '../../../src/Data/expectedTextResults/privacyAndManagementText';
import { ACCOUNTS_PAYOUTS_AND_BONUSES_TEXT } from '../../../src/Data/expectedTextResults/accountsPayoutsAndBonusesText';
import { KYC_POLICIES_TEXT } from '../../../src/Data/expectedTextResults/kycPoliciesText';

test.describe('Footer', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test('License', async () => {
    await tombRiches.mainPage.footer.cbgLicenseButton.click();
    const currentPageUrl = tombRiches.page.url();
    await expect(currentPageUrl).toContain(CBG_LICENSE_URL);
  });

  test('Online chat support', async () => {
    await tombRiches.clickOn(tombRiches.intercomApp);
    await tombRiches.intercomBody.scrollIntoViewIfNeeded();
    await expect(tombRiches.intercomBody).toBeVisible();
  });

  test('Click “Terms of Service”', async () => {
    await tombRiches.mainPage.footer.openFooterLink('termsOfService');
    await expect(tombRiches.termsOfService.termsOfServicePageContent).toBeVisible();

    const pageContent = await tombRiches.termsOfService.termsOfServicePageContent.textContent();
    expect(pageContent).toEqual(TERMS_AND_CONDITIONS_TEXT);
  });

  test('Click “Responsible Gaming”', async () => {
    await tombRiches.mainPage.footer.openFooterLink('responsibleGaming');
    await expect(tombRiches.responsibleGambling.responsibleGamblingPageContent).toBeVisible();

    const pageContent =
      await tombRiches.responsibleGambling.responsibleGamblingPageContent.textContent();
    expect(pageContent).toEqual(RESPONSIBLE_GAMBLING_TEXT);
  });

  test('Click “Self-Exclusion”', async () => {
    await tombRiches.mainPage.footer.openFooterLink('selfExclusion');
    await expect(tombRiches.selfExclusion.selfExclusionPageContent).toBeVisible();

    const pageContent = await tombRiches.selfExclusion.selfExclusionPageContent.textContent();
    expect(pageContent).toEqual(SELF_EXCLUSION_TEXT);
  });

  test('Click “Privacy & Management of Personal Data”', async () => {
    await tombRiches.mainPage.footer.openFooterLink('privacyAndManagementOfPersonalData');
    await expect(
      tombRiches.privacyAndManagementOfPersonalData.privacyAndManagementOfPersonalDataPageContent
    ).toBeVisible();

    const pageContent =
      await tombRiches.privacyAndManagementOfPersonalData.privacyAndManagementOfPersonalDataPageContent.textContent();
    expect(pageContent).toEqual(PRIVACY_AND_MANAGEMENT_TEXT);
  });

  test('Accounts, Payouts & Bonuses', async () => {
    await tombRiches.mainPage.footer.openFooterLink('accountsPayoutsAndBonuses');
    await expect(
      tombRiches.accountsPayoutsAndBonuses.accountsPayoutsAndBonusesPageContent
    ).toBeVisible();

    const pageContent =
      await tombRiches.accountsPayoutsAndBonuses.accountsPayoutsAndBonusesPageContent.textContent();
    expect(pageContent).toEqual(ACCOUNTS_PAYOUTS_AND_BONUSES_TEXT);
  });

  test('KYC Policies', async () => {
    await tombRiches.mainPage.footer.openFooterLink('kycPolicies');
    await expect(tombRiches.kycPolicies.kycPoliciesPageContent).toBeVisible();

    const pageContent = await tombRiches.kycPolicies.kycPoliciesPageContent.textContent();
    expect(pageContent).toEqual(KYC_POLICIES_TEXT);
  });
});
