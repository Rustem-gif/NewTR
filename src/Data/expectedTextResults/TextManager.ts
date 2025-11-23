import { TERMS_AND_CONDITIONS_TEXT } from './termsAndContidions';
import { RESPONSIBLE_GAMBLING_TEXT } from './responsibleGambling';
import { SELF_EXCLUSION_TEXT } from './selfExclusionText';
import { PRIVACY_AND_MANAGEMENT_TEXT } from './privacyAndManagementText';
import { ACCOUNTS_PAYOUTS_AND_BONUSES_TEXT } from './accountsPayoutsAndBonusesText';
import { KYC_POLICIES_TEXT } from './kycPoliciesText';

export const EXPECTED_TEXTS = {
  termsOfService: TERMS_AND_CONDITIONS_TEXT,
  responsibleGaming: RESPONSIBLE_GAMBLING_TEXT,
  selfExclusion: SELF_EXCLUSION_TEXT,
  privacyAndManagementOfPersonalData: PRIVACY_AND_MANAGEMENT_TEXT,
  accountsPayoutsAndBonuses: ACCOUNTS_PAYOUTS_AND_BONUSES_TEXT,
  kycPolicies: KYC_POLICIES_TEXT,
};

export type FooterLinkType = keyof typeof EXPECTED_TEXTS;
