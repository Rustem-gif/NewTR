import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';
import WelcomePack from './components/WelcomePack';

export default class PromoPage extends BasePage {
  readonly promoBanner: Locator = this.page.locator('.campaign-item').describe('Promo banner');
  readonly takeItButton: Locator = this.page
    .locator('.take-promo-button')
    .describe('Take it button');
  readonly detailsButton: Locator = this.page
    .getByRole('link', { name: 'Details' })
    .describe('Details button');

  async openWelcomePack(): Promise<WelcomePack> {
    await this.promoBanner.filter({ hasText: 'WELCOME PACK' }).locator(this.detailsButton).click();
    return new WelcomePack(this.page);
  }
}
