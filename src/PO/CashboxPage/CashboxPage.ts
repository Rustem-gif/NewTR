import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class CashboxPage extends BasePage {
  readonly depMethodContainer: Locator = this.page
    .locator('.lobby-payment-methods-container')
    .describe('Deposit methods container');
  readonly depMethod: Locator = this.page
    .locator('.cashbox-deposit-lobby-logo')
    .describe('Deposit method');
  readonly depositButton: Locator = this.page
    .locator('#nav-button-deposit')
    .describe('Deposit button');
  readonly withdrawButton: Locator = this.page
    .locator('#nav-button-withdrawal')
    .describe('Withdraw button');
  readonly historyButton: Locator = this.page
    .locator('#nav-button-payment-history')
    .describe('History button');
  readonly creditCards: Locator = this.page
    .locator('#direction-button-cards-de')
    .describe('Credit cards');
  readonly applePay: Locator = this.page
    .locator('#direction-button-applepay-de')
    .describe('Apple Pay');
  readonly googlePay: Locator = this.page
    .locator('#direction-button-googlepay-de')
    .describe('Google Pay');
  readonly cryptoDeposit: Locator = this.page
    .locator('#direction-button-crypto-de')
    .describe('Crypto deposit');

  async getDepMethodCount(): Promise<number> {
    return this.depMethod.count();
  }
}
