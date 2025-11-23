import { Locator } from '@playwright/test';
import BaseComponent from '../../../Base/BaseComponent';

type CategoryName =
  | 'All Games'
  | 'Spotlight'
  | 'New'
  | 'TOP'
  | 'Live'
  | 'Crash'
  | 'Bonus buy'
  | 'Classic Slots'
  | 'Jackpots'
  | 'Megaways'
  | 'Table Games'
  | 'Poker'
  | 'Card Games'
  | 'Lottery'
  | 'TV Games'
  | 'Fishing'
  | 'Virtual Sports';

type CategoryHeadings =
  | 'All Games'
  | 'Spotlight'
  | 'New Games'
  | 'Top Games'
  | 'Live Games'
  | 'Crash Games'
  | 'Bonus buy Games'
  | 'Classic Slots'
  | 'Jackpot Games'
  | 'Megaways Games'
  | 'Table Games'
  | 'Poker'
  | 'Card Games'
  | 'Lottery'
  | 'TV Games'
  | 'Fishing'
  | 'Virtual Sports';

export const SLIDER_MAPPING: Record<CategoryName, CategoryHeadings> = {
  'All Games': 'All Games',
  Spotlight: 'Spotlight',
  New: 'New Games',
  TOP: 'Top Games',
  Live: 'Live Games',
  Crash: 'Crash Games',
  'Bonus buy': 'Bonus buy Games',
  'Classic Slots': 'Classic Slots',
  Jackpots: 'Jackpot Games',
  Megaways: 'Megaways Games',
  'Table Games': 'Table Games',
  Poker: 'Poker',
  'Card Games': 'Card Games',
  Lottery: 'Lottery',
  'TV Games': 'TV Games',
  Fishing: 'Fishing',
  'Virtual Sports': 'Virtual Sports',
};
export default class GameSlider extends BaseComponent {
  readonly sliderCategoryButton: (categoryName: CategoryName) => Locator = (
    categoryName: CategoryName
  ) => this.page.locator('.sort-bar').getByRole('link', { name: categoryName, exact: true });
  readonly categoryTitle: (categoryName: CategoryHeadings) => Locator = (
    categoryName: CategoryHeadings
  ) => this.page.getByRole('heading', { name: categoryName, exact: true });

  public async selectCategoryAndVerifyHeading(categoryName: CategoryName): Promise<void> {
    const expectedHeading = SLIDER_MAPPING[categoryName];
    await this.clickOn(this.sliderCategoryButton(categoryName));
    await this.categoryTitle(expectedHeading).waitFor({ state: 'visible', timeout: 5000 });
  }
}
