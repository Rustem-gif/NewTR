import { Locator, Page } from '@playwright/test';

type NavigationMappingType = {
  registrationPage: string;
  loginPage: string;
  mainPage: string;
  playerProfile: string;
};

type NavigationKeys = keyof NavigationMappingType;

export default class Base {
  constructor(public page: Page) {
    this.page = page;
  }

  private navigationMapping: NavigationMappingType = {
    registrationPage: '/register?ref_code=d3t44hgpj5fls7070f80&sub_id5=test',
    loginPage: '/login',
    mainPage: '/',
    playerProfile: '/profile/balance',
  };

  async navTo(url: NavigationKeys): Promise<void> {
    await this.page.goto(this.navigationMapping[url]);
    await this.page.waitForLoadState('load');
  }

  async clickOn(selector: Locator): Promise<void> {
    await selector.waitFor({ state: 'visible' });
    await selector.click();
  }
}
