import BasePage from '../../../Base/BasePage';

export default class InfoPages extends BasePage {
  readonly textContent = this.page
    .locator('.static-page-content-container')
    .describe('Info page text content');
}
