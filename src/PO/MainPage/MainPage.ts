import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class MainPage extends BasePage {
  private burgerMenuButton: Locator = this.page.locator('#burger-menu-button');
  private headerSearchInput: Locator = this.page.locator('#header-search-input');
  private headerSignInButton: Locator = this.page.locator('#header-sign-in-button');
  private headerSignUpButton: Locator = this.page.locator('#header-sign-up-button');
  public mainBannerSlider: Locator = this.page.locator('.main-banner-mini-swiper');
  public categorieSlider: Locator = this.page.locator('.sort-bar-holder');
  public topGamesContainer: Locator = this.page.locator('.top-games-scroll-container');
}
