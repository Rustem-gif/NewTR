import { expect, Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';
import Header from '../../components/Header/Header';
import GamePage from './components/gamePage';

export default class MainPage extends BasePage {
  private burgerMenuButton: Locator = this.page.locator('#burger-menu-button');
  private headerSearchInput: Locator = this.page.locator('#header-search-input');
  private headerSignInButton: Locator = this.page.locator('#header-sign-in-button');
  private headerSignUpButton: Locator = this.page.locator('#header-sign-up-button');
  public anyFirstGameInTopGames: Locator = this.page.locator('.top-game-item:nth-of-type(1)');
  public mainBannerSlider: Locator = this.page.locator('.main-banner-mini-swiper');
  public categorieSlider: Locator = this.page.locator('.sort-bar-holder');
  public topGamesContainer: Locator = this.page.locator(
    '.top-game-item:nth-of-type(1) > .game-tile-overlay'
  );
  public playButton: (parent: Locator) => Locator = parent => parent.locator('.play-button');

  public _header = new Header(this.page);

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
}
