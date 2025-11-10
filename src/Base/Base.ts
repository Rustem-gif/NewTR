import { Locator, Page } from '@playwright/test';
import playwrightConfig from '../../playwright.config';

type NavigationMappingType = {
  registrationPage: string;
  loginPage: string;
  mainPage: string;
  playerProfile: string;
  cashboxPage: string;
  licensePage: string;
};

type NavigationKeys = keyof NavigationMappingType;

export default class Base {
  public acceptCookiesButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.acceptCookiesButton = this.page.locator('.accept-cookies-button');
    this.setupLocatorHandlers();
  }

  private navigationMapping: NavigationMappingType = {
    registrationPage: '/register?ref_code=d3t44hgpj5fls7070f80&sub_id5=test',
    loginPage: '/login',
    mainPage: '/',
    playerProfile: '/profile/balance',
    cashboxPage: '/cashbox/deposit',
    licensePage: 'https://cert.gcb.cw/certificate',
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
}
