import { Locator } from '@playwright/test';
import BaseComponent from '../../../Base/BaseComponent';

export default class WelcomePack extends BaseComponent {
  readonly welcomePackHeader: Locator = this.page
    .locator('.campaign-title')
    .describe('Welcome pack header');
}
