import { expect, Locator } from '@playwright/test';
import BaseComponent from '../../Base/BaseComponent';
import GamePage from '../../PO/MainPage/components/gamePage';

export default class Header extends BaseComponent {
  private searchInput: Locator = this.page.locator('#header-search-input');
  private searchResultGame: Locator = this.page.locator(
    '.search-results-container .game-tile-overlay'
  );
  private searchPlayButton: (parent: Locator) => Locator = parent => parent.locator('.play-button');
  readonly searchGameName: (parent: Locator) => Locator = parent => parent.locator('.game-name');
  readonly cashboxButton: Locator = this.page.locator('#header-cashbox-button');

  async searchForGame(gameName: string): Promise<GamePage> {
    await this.searchInput.fill(gameName);
    await this.searchResultGame.hover();
    await expect(this.searchGameName(this.searchResultGame)).toHaveText(gameName, {
      timeout: 5000,
    });
    await this.clickOn(this.searchPlayButton(this.searchResultGame));
    return new GamePage(this.page);
  }
}
