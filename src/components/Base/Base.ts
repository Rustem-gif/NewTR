import { Locator, Page } from '@playwright/test';

export default class Base {
  constructor(protected page: Page) {
    this.page = page;
  }

  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

  async clickOn(selector: Locator): Promise<void> {
    await selector.waitFor({ state: 'visible' });
    await selector.click();
  }

  getElement(idName: string): Locator {
    return this.page.locator(`#${idName}`);
  }
}
