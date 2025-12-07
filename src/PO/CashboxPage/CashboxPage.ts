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
  readonly creditCards: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-cards-${countryCode}`).describe('Credit cards');
  readonly applePay: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-applepay-${countryCode}`).describe('Apple Pay');
  readonly googlePay: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-googlepay-${countryCode}`).describe('Google Pay');
  readonly cryptoDeposit: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-crypto-${countryCode}`).describe('Crypto deposit');
  readonly sofortDeposit: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-sofort-${countryCode}`).describe('Sofort deposit');
  readonly openBanking: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-openbanking-${countryCode}`).describe('Open banking');
  readonly epsBanking: (countryCode: string) => Locator = (countryCode = 'de') =>
    this.page.locator(`#direction-button-eps-${countryCode}`).describe('EPS banking');
  readonly depositMethodsContainer: Locator = this.page
    .locator('.lobby-payment-methods-container')
    .describe('Deposit methods container');

  async getDepMethodCount(): Promise<number> {
    return this.depMethod.count();
  }
}
