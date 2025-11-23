import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class VipPage extends BasePage {
  readonly levelsGalleryTitle: Locator = this.page
    .locator('.levels-gallery-title')
    .describe('Levels gallery title');
}
