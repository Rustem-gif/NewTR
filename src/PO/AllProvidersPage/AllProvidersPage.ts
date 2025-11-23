import BasePage from '../../Base/BasePage';

export default class AllProvidersPage extends BasePage {
  readonly providerCard = this.page.locator('.providers-button').describe('Provider card');
  readonly getMoreButton = this.page
    .locator('//h5[contains(text(),"Providers")]//parent::div//following-sibling::div')
    .describe('Get more button');
}
