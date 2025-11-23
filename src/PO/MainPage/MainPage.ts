import { expect, Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';
import Header from '../../components/Header/Header';
import GamePage from './components/gamePage';
import GameSlider from './components/GameCategorySlider';
import UpperNavigationPanel from './components/UpperNavigationPanel';
import PromoBlock from './components/PromoBlock';
import AllProvidersPage from '../AllProvidersPage/AllProvidersPage';

export default class MainPage extends BasePage {
  readonly anyFirstGameInTopGames: Locator = this.page
    .locator('.top-game-item:nth-of-type(1)')
    .describe('First top game');
  readonly mainBannerSlider: Locator = this.page
    .locator('.main-banner-mini-swiper')
    .describe('Main banner slider');
  readonly categorieSlider: Locator = this.page
    .locator('.sort-bar-holder')
    .describe('Category slider');
  readonly topGamesContainer: Locator = this.page
    .locator('.top-game-item:nth-of-type(1) > .game-tile-overlay')
    .describe('Top games container');
  readonly gameBlock: Locator = this.page.locator('.common-game-tile').describe('Game block');
  readonly playButton: (parent: Locator) => Locator = parent => parent.locator('.play-button');

  readonly header = new Header(this.page);
  readonly gameCategorySlider = new GameSlider(this.page);
  readonly upperNavigationPanel = new UpperNavigationPanel(this.page);
  readonly promoBlock = new PromoBlock(this.page);
  readonly allProvidersBlock = new AllProvidersPage(this.page);

  async verifyMainPageUIElements(): Promise<void> {
    await expect.soft(this.mainBannerSlider).toBeVisible();
    await expect.soft(this.categorieSlider).toBeVisible();
    await expect.soft(this.topGamesContainer).toBeVisible();
  }

  async openFirstTopGame(): Promise<GamePage> {
    await this.anyFirstGameInTopGames.hover();
    await this.clickOn(this.playButton(this.anyFirstGameInTopGames));
    return new GamePage(this.page);
  }

  async getNumberOfGames(): Promise<number> {
    return this.gameBlock.count();
  }
}
