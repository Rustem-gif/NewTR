import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class WheelPage extends BasePage {
  readonly luckyPrizeHeaderContent: Locator = this.page
    .locator('.lucky-prize-header-content')
    .describe('Lucky prize header');
}
