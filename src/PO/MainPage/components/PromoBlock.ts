import PromoPage from '../../PromoPage/PromoPage';

export default class PromoBlock extends PromoPage {
  async scrollToPromoBlock(): Promise<void> {
    let promoBlockIsVisible = await this.promoBanner.first().isVisible();
    while (!promoBlockIsVisible) {
      await this.scrollPageDown();
      promoBlockIsVisible = await this.promoBanner.first().isVisible();
    }
  }
}
