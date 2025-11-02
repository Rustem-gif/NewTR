import BasePage from '../../components/Base/BasePage';

export default class SignInPage extends BasePage {
  private emailInput = this.page.locator('#email-input');
  private passwordInput = this.page.locator('input[autocomplete="current-password"]');
  private signInButton = this.page.locator('#login-submit-button');
  private forgotPasswordButton = this.page.locator('#forgot-password-button');
}
