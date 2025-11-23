import AllProvidersPage from '../../AllProvidersPage/AllProvidersPage';

export default class ProvidersBlock extends AllProvidersPage {
  readonly providerCard = this.page.locator('.providers-button').describe('Provider card');
  readonly getMoreButton = this.page
    .locator('.title-container', { hasText: 'Providers' })
    .describe('Get more button');
  async scrollToPromoBlock(): Promise<void> {
    let promoBlockIsVisible = await this.providerCard.first().isVisible();
    while (!promoBlockIsVisible) {
      await this.scrollPageDown();
      promoBlockIsVisible = await this.providerCard.first().isVisible();
    }
  }
}
