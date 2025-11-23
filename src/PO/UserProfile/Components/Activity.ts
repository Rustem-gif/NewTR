import { Locator } from 'playwright-core';
import BaseComponent from '../../../Base/BaseComponent';

type ActivityHubButtons = 'Hub' | 'My Bonuses';

export default class ActivityHub extends BaseComponent {
  readonly activityHubButton: (button: ActivityHubButtons) => Locator = button =>
    this.page.getByRole('list').getByRole('link', { name: button });

  readonly hubTable: Locator = this.page.locator('.hub-tab-grid').describe('Hub table');
  readonly linkTicket: Locator = this.page
    .locator('.hub-header-links .chip-link.ticket')
    .describe('Ticket link');
  readonly linkWheel: Locator = this.page
    .locator('.hub-header-links .chip-link.wheel')
    .describe('Wheel link');
  readonly userAvatar: Locator = this.page
    .locator('.user-customization-button')
    .describe('User avatar');
  readonly inactiveBackground = this.page
    .locator('.coming-soon-bg')
    .describe('Inactive background');
  readonly vipCard: Locator = this.page.locator('.vip-grid-card').describe('VIP card');
  readonly wheelCard: Locator = this.page.locator('.wheel-grid-card').describe('Wheel card');

  readonly activeBonusesSquare: Locator = this.page
    .locator('.profile-card.bonuses-list')
    .describe('Active bonuses');

  get getActivityHubButton(): (button: ActivityHubButtons) => Locator {
    return this.activityHubButton;
  }
}
