import { Locator } from '@playwright/test';
import Base from '../Base/Base';
import { USERS } from '../Data/Users';
import CashboxPage from '../PO/CashboxPage/CashboxPage';
import MainPage from '../PO/MainPage/MainPage';
import SignInPage from '../PO/SignInUp/SignInPage';
import SignUpPage from '../PO/SignInUp/SignUpPage';
import UserBuilder from '../utils/userBuilder';
import TermsOfService from '../PO/TermsOfService/TermsOfService';
import ResponsibleGambling from '../PO/ResponsibleGambling/ResponsibleGambling';
import SelfExclusionPage from '../PO/SelfExclusionPage/SelfExclusionPage';
import PrivacyAndManagementOfPersonalData from '../PO/PrivacyAndManagement/PrivacyAndManagement';
import AccountsPayoutsAndBonuses from '../PO/AccountsPayouts/AccountsPayouts';
import { KycPolicies } from '../PO/KYCpolicies/KycPolicies';

export default class TombRiches extends Base {
  public mainPage: MainPage = new MainPage(this.page);
  public signInPage: SignInPage = new SignInPage(this.page);
  public signUpPage: SignUpPage = new SignUpPage(this.page);
  public CashboxPage = new CashboxPage(this.page);
  public userBuilder = new UserBuilder();
  public termsOfService = new TermsOfService(this.page);
  public responsibleGambling = new ResponsibleGambling(this.page);
  public selfExclusion = new SelfExclusionPage(this.page);
  public privacyAndManagementOfPersonalData = new PrivacyAndManagementOfPersonalData(this.page);
  public accountsPayoutsAndBonuses = new AccountsPayoutsAndBonuses(this.page);
  public kycPolicies = new KycPolicies(this.page);

  public users = USERS;

  public intercomApp: Locator = this.page.locator('.intercom-launcher');
  public intercomBody: Locator = this.page
    .locator('iframe[name="intercom-messenger-frame"]')
    .contentFrame()
    .locator('.intercom-home-screen-search-browse-card');
}
