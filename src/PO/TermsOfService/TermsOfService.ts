import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class TermsOfService extends BasePage {
  public termsOfServicePageContent: Locator = this.page.locator('.static-page-content-container');
}
