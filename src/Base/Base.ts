import { Locator, Page } from '@playwright/test';
import playwrightConfig from '../../playwright.config';

type NavigationMappingType = {
  registrationPage: string;
  loginPage: string;
  mainPage: string;
  playerProfile: string;
  cashboxPageDeposit: string;
  cashboxPageWithdraw: string;
  licensePage: string;
  walletPage: string;
  vipPage: string;
  wheelPage: string;
  promoPage: string;
  myBonusesPage: string;
  allProvidersPage: string;
};

type NavigationKeys = keyof NavigationMappingType;

export default class Base {
  readonly acceptCookiesButton: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.acceptCookiesButton = this.page
      .locator('.accept-cookies-button')
      .describe('Accept Cookies Button');
    this.setupLocatorHandlers();
  }

  private navigationMapping: NavigationMappingType = {
    registrationPage: '/register?ref_code=d3t44hgpj5fls7070f80&sub_id5=test',
    loginPage: '/login',
    mainPage: '/',
    playerProfile: '/profile/balance',
    cashboxPageDeposit: '/cashbox/deposit',
    cashboxPageWithdraw: '/cashbox/withdraw',
    walletPage: '/profile/balance',
    licensePage: 'https://cert.gcb.cw/certificate',
    vipPage: '/vip',
    wheelPage: '/lucky-prize/wheel',
    promoPage: '/campaigns',
    myBonusesPage: '/profile/activity/my-bonuses',
    allProvidersPage: '/providers',
  };

  private async setupLocatorHandlers(): Promise<void> {
    await this.page.addLocatorHandler(this.page.locator('.cio-message-visible'), async () => {
      await this.page.locator('.message.dismiss({})').click();
    });
  }

  async navTo(url: NavigationKeys): Promise<void> {
    await this.page.goto(this.navigationMapping[url]);
    await this.page.waitForLoadState('load');
    await this.acceptCookies();
  }

  async clickOn(selector: Locator): Promise<void> {
    await selector.waitFor({ state: 'visible' });
    await selector.click();
  }

  async acceptCookies(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  async returnLink(url: NavigationKeys): Promise<string> {
    return playwrightConfig.use?.baseURL + this.navigationMapping[url];
  }

  async getUrl(page: NavigationKeys): Promise<string> {
    return playwrightConfig.use?.baseURL + this.navigationMapping[page];
  }

  async scrollPageDown(): Promise<void> {
    await this.page.evaluate(() => {
      // eslint-disable-next-line no-undef
      window.scrollBy(0, window.innerHeight);
    });
  }
}
