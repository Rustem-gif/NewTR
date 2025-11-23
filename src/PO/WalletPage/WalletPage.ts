import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class WalletPage extends BasePage {
  readonly depositButton: Locator = this.page
    .locator('.profile-card-content #balances-info-deposit-butotn')
    .describe('Deposit button');
  readonly withdrawButton: Locator = this.page
    .locator('.profile-card-content #balances-info-withdrawal-butotn')
    .describe('Withdraw button');
}
