import BasePage from '../../Base/BasePage';

export default class SignInPage extends BasePage {
  private emailInput = this.page.locator('#email-input');
  private phoneButton = this.page.getByRole('button', { name: 'Phone' });
  private phoneNumberInput = this.page.locator('#phone-input');
  private passwordInput = this.page.locator('input[autocomplete="current-password"]');
  private signInButton = this.page.locator('#login-submit-button');
  private forgotPasswordButton = this.page.locator('#forgot-password-button');

  async signIn(
    mode: 'email' | 'phone',
    { email, password, phoneNumber }: { email?: string; password?: string; phoneNumber?: string }
  ): Promise<void> {
    if (mode === 'phone') {
      await this.phoneButton.click();
      if (phoneNumber) await this.phoneNumberInput.fill(phoneNumber);
    } else {
      if (email) await this.emailInput.fill(email);
    }
    if (password) await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
