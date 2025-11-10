import { Locator } from '@playwright/test';
import BaseComponent from '../../Base/BaseComponent';

type FooterLinksType = {
  termsOfService: Locator;
  responsibleGaming: Locator;
  selfExclusion: Locator;
  disputeResolution: Locator;
  antiMoneyLaundering: Locator;
  fairnessAndRngTesting: Locator;
  kycPolicies: Locator;
  privacyAndManagementOfPersonalData: Locator;
  accountsPayoutsAndBonuses: Locator;
};

export default class Footer extends BaseComponent {
  public cbgLicenseButton: Locator = this.page.locator('.footer-trust-icon.wide-footer-trust-icon');
  public footerLinks: FooterLinksType = {
    termsOfService: this.page.getByRole('link', { name: 'Terms of Service' }),
    responsibleGaming: this.page.getByRole('link', { name: 'Responsible Gaming' }),
    selfExclusion: this.page.getByRole('link', { name: 'Self-Exclusion' }),
    disputeResolution: this.page.getByRole('link', { name: 'Dispute Resolution' }),
    antiMoneyLaundering: this.page.getByRole('link', { name: 'Anti-Money Laundering' }),
    fairnessAndRngTesting: this.page.getByRole('link', { name: 'Fairness & RNG Testing' }),
    kycPolicies: this.page.getByRole('link', { name: 'KYC Policies' }),
    privacyAndManagementOfPersonalData: this.page.getByRole('link', {
      name: 'Privacy & Management of Personal Data',
    }),
    accountsPayoutsAndBonuses: this.page.getByRole('link', { name: 'Accounts, Payouts & Bonuses' }),
  };

  async openFooterLink(link: keyof FooterLinksType): Promise<void> {
    await this.clickOn(this.footerLinks[link]);
  }
}
