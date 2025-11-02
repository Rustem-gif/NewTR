import { Locator } from '@playwright/test';
import BasePage from '../../components/Base/BasePage';

export default class SignUpPage extends BasePage {
  private emailInput: Locator = this.page.locator('#email-input');
  private passwordInput: Locator = this.page.locator('#password-input');
  private promoCodeInput: Locator = this.page.locator('#promoCode-input');
  private regionInput: Locator = this.page.locator('#region-input');
  private currencyInput: Locator = this.page.locator('#currency-input');
  private submitRegistrationButton: Locator = this.page.locator('#sibmit-registration-button');
  private authRulesSwitcher: Locator = this.page.locator('#auth-rules-switcher');
  private goToSignInButton: Locator = this.page.locator('#go-to-sign-in-button');
}
