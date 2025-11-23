import { Locator } from '@playwright/test';
import Base from '../Base/Base';
import { USERS } from '../Data/Users';
import CashboxPage from '../PO/CashboxPage/CashboxPage';
import MainPage from '../PO/MainPage/MainPage';
import SignInPage from '../PO/SignInUp/SignInPage';
import SignUpPage from '../PO/SignInUp/SignUpPage';
import UserBuilder from '../utils/userBuilder';
import InfoPages from '../PO/InfoPages/InfoPage/InfoPage';
import WalletPage from '../PO/WalletPage/WalletPage';
import UserProfile from '../PO/UserProfile/UserProfile';
import VipPage from '../PO/VipPage/VipPage';
import WheelPage from '../PO/WheelPage/WheelPage';
import PromoPage from '../PO/PromoPage/PromoPage';
import AllProvidersPage from '../PO/AllProvidersPage/AllProvidersPage';

export default class TombRiches extends Base {
  private _mainPage?: MainPage;
  private _signInPage?: SignInPage;
  private _signUpPage?: SignUpPage;
  private _cashboxPage?: CashboxPage;
  private _userBuilder?: UserBuilder;
  private _infoPages?: InfoPages;
  private _walletPage?: WalletPage;
  private _userProfile?: UserProfile;
  private _vipPage?: VipPage;
  private _wheelPage?: WheelPage;
  private _promoPage?: PromoPage;
  private _allProvidersPage?: AllProvidersPage;

  public get mainPage(): MainPage {
    if (!this._mainPage) {
      this._mainPage = new MainPage(this.page);
    }
    return this._mainPage;
  }

  public get signInPage(): SignInPage {
    if (!this._signInPage) {
      this._signInPage = new SignInPage(this.page);
    }
    return this._signInPage;
  }

  public get signUpPage(): SignUpPage {
    if (!this._signUpPage) {
      this._signUpPage = new SignUpPage(this.page);
    }
    return this._signUpPage;
  }

  public get cashboxPage(): CashboxPage {
    if (!this._cashboxPage) {
      this._cashboxPage = new CashboxPage(this.page);
    }
    return this._cashboxPage;
  }

  public get CashboxPage(): CashboxPage {
    return this.cashboxPage;
  }

  public get userBuilder(): UserBuilder {
    if (!this._userBuilder) {
      this._userBuilder = new UserBuilder();
    }
    return this._userBuilder;
  }

  private get infoPages(): InfoPages {
    if (!this._infoPages) {
      this._infoPages = new InfoPages(this.page);
    }
    return this._infoPages;
  }

  public get termsOfService(): InfoPages {
    return this.infoPages;
  }

  public get responsibleGambling(): InfoPages {
    return this.infoPages;
  }

  public get selfExclusion(): InfoPages {
    return this.infoPages;
  }

  public get privacyAndManagementOfPersonalData(): InfoPages {
    return this.infoPages;
  }

  public get accountsPayoutsAndBonuses(): InfoPages {
    return this.infoPages;
  }

  public get kycPolicies(): InfoPages {
    return this.infoPages;
  }

  public get walletPage(): WalletPage {
    if (!this._walletPage) {
      this._walletPage = new WalletPage(this.page);
    }
    return this._walletPage;
  }

  public get userProfile(): UserProfile {
    if (!this._userProfile) {
      this._userProfile = new UserProfile(this.page);
    }
    return this._userProfile;
  }

  public get vipPage(): VipPage {
    if (!this._vipPage) {
      this._vipPage = new VipPage(this.page);
    }
    return this._vipPage;
  }

  public get wheelPage(): WheelPage {
    if (!this._wheelPage) {
      this._wheelPage = new WheelPage(this.page);
    }
    return this._wheelPage;
  }

  public get promoPage(): PromoPage {
    if (!this._promoPage) {
      this._promoPage = new PromoPage(this.page);
    }
    return this._promoPage;
  }

  public get allProvidersPage(): AllProvidersPage {
    if (!this._allProvidersPage) {
      this._allProvidersPage = new AllProvidersPage(this.page);
    }
    return this._allProvidersPage;
  }

  public users = USERS;

  public get intercomApp(): Locator {
    return this.page.locator('.intercom-launcher');
  }

  public get intercomBody(): Locator {
    return this.page
      .locator('iframe[name="intercom-messenger-frame"]')
      .contentFrame()
      .locator('.intercom-home-screen-search-browse-card');
  }
}
