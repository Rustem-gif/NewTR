import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';

export default class CashboxPage extends BasePage {
  public depMethodContainer: Locator = this.page.locator('.lobby-payment-methods-container');
  public depMethod: Locator = this.page.locator('.cashbox-deposit-lobby-logo');
  public depositButton: Locator = this.page.locator('#nav-button-deposit');
  public withdrawButton: Locator = this.page.locator('#nav-button-withdrawal');
  public historyButton: Locator = this.page.locator('#nav-button-payment-history');
  public creditCards: Locator = this.page.locator('#direction-button-cards-de');
  public applePay: Locator = this.page.locator('#direction-button-applepay-de');
  public googlePay: Locator = this.page.locator('#direction-button-googlepay-de');
  public cryptoDeposit: Locator = this.page.locator('#direction-button-crypto-de');

  async getDepMethodCount(): Promise<number> {
    return this.depMethod.count();
  }
}
