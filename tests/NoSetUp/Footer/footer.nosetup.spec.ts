import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import { CBG_LICENSE_URL } from '../../../src/Data/contants';
import { EXPECTED_TEXTS } from '../../../src/Data/expectedTextResults/TextManager';
import { qase } from 'playwright-qase-reporter';

test.describe('Footer', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test(qase(570, 'License'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.cbgLicenseButton.click();
    const currentPageUrl = tombRiches.page.url();
    await expect(currentPageUrl).toContain(CBG_LICENSE_URL);
  });

  test(qase(573, 'Online chat support'), { tag: '@smoke' }, async () => {
    await tombRiches.clickOn(tombRiches.intercomApp);
    await tombRiches.intercomBody.scrollIntoViewIfNeeded();
    await expect(tombRiches.intercomBody).toBeVisible();
  });

  test(qase(599, 'Click "Terms of Service"'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('termsOfService');
    await expect(tombRiches.termsOfService.textContent).toBeVisible();

    const pageContent = await tombRiches.termsOfService.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.termsOfService);
  });

  test(qase(600, 'Click "Responsible Gaming"'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('responsibleGaming');
    await expect(tombRiches.responsibleGambling.textContent).toBeVisible();

    const pageContent = await tombRiches.responsibleGambling.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.responsibleGaming);
  });

  test(qase(601, 'Click "Self-Exclusion"'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('selfExclusion');
    await expect(tombRiches.selfExclusion.textContent).toBeVisible();

    const pageContent = await tombRiches.selfExclusion.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.selfExclusion);
  });

  test(qase(607, 'Click "Privacy & Management of Personal Data"'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('privacyAndManagementOfPersonalData');
    await expect(tombRiches.privacyAndManagementOfPersonalData.textContent).toBeVisible();

    const pageContent =
      await tombRiches.privacyAndManagementOfPersonalData.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.privacyAndManagementOfPersonalData);
  });

  test(qase(608, 'Accounts, Payouts & Bonuses'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('accountsPayoutsAndBonuses');
    await expect(tombRiches.accountsPayoutsAndBonuses.textContent).toBeVisible();

    const pageContent = await tombRiches.accountsPayoutsAndBonuses.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.accountsPayoutsAndBonuses);
  });

  test(qase(606, 'KYC Policies'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.footer.openFooterLink('kycPolicies');
    await expect(tombRiches.kycPolicies.textContent).toBeVisible();

    const pageContent = await tombRiches.kycPolicies.textContent.textContent();
    expect(pageContent).toEqual(EXPECTED_TEXTS.kycPolicies);
  });
});
