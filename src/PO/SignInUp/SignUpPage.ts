import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';
import { RegUser, UserData } from '../../utils/userBuilder';

export default class SignUpPage extends BasePage {
  protected emailInput: Locator = this.page.locator('#email-input');
  protected passwordInput: Locator = this.page.locator('#password-input');

  protected firstNameInput: Locator = this.page.locator('#firstName-input');
  protected lastNameInput: Locator = this.page.locator('#lastName-input');
  protected regionInput: Locator = this.page.locator('#address\\.region-input');
  protected cityInput: Locator = this.page.locator('#address\\.city-input');
  protected homeAddressInput: Locator = this.page.locator('#address\\.homeAddress-input');
  protected zipCodeInput: Locator = this.page.locator('#address\\.zipCode-input');

  protected yearSelect: Locator = this.page.locator('#birthDate\\.year-input');
  protected monthSelect: Locator = this.page.locator('#birthDate\\.month-input');
  protected daySelect: Locator = this.page.locator('#birthDate\\.day-input');
  protected submitRegFormButton: Locator = this.page.locator('#sibmit-registration-button');

  protected authRulesSwitcher: Locator = this.page.locator('#auth-rules-switcher');
  protected goToSignInButton: Locator = this.page.locator('#go-to-sign-in-button');

  public emailInputErrorUsed: Locator = this.page.getByText(
    'User with this email is already registered'
  );

  private mapUserDataToRegUser(userData: UserData): RegUser {
    const regUser: RegUser = {};

    if (userData.email) {
      regUser.email = { ...userData.email, locator: this.emailInput };
    }
    if (userData.password) {
      regUser.password = { ...userData.password, locator: this.passwordInput };
    }
    if (userData.firstName) {
      regUser.firstName = { ...userData.firstName, locator: this.firstNameInput };
    }
    if (userData.lastName) {
      regUser.lastName = { ...userData.lastName, locator: this.lastNameInput };
    }
    if (userData.region) {
      regUser.region = { ...userData.region, locator: this.regionInput };
    }
    if (userData.city) {
      regUser.city = { ...userData.city, locator: this.cityInput };
    }
    if (userData.homeAddress) {
      regUser.homeAddress = { ...userData.homeAddress, locator: this.homeAddressInput };
    }
    if (userData.zipCode) {
      regUser.zipCode = { ...userData.zipCode, locator: this.zipCodeInput };
    }
    if (userData.birthDate) {
      regUser.birthDate = {
        year: { ...userData.birthDate.year, locator: this.yearSelect },
        month: { ...userData.birthDate.month, locator: this.monthSelect },
        day: { ...userData.birthDate.day, locator: this.daySelect },
      };
    }
    return regUser;
  }

  private async fillSignUpFormInputs(user: RegUser): Promise<void> {
    for (const [key, field] of Object.entries(user)) {
      console.log(`Filling field: ${key} with value: ${JSON.stringify(field)}`);
      if (field) {
        if (field.type === 'input') {
          await field.locator.scrollIntoViewIfNeeded();
          await field.locator.fill(field.value);
        }
      }
    }
  }

  private async selectBirthDate(user: RegUser): Promise<void> {
    for (const [key, field] of Object.entries(user)) {
      if (key === 'birthDate' && field) {
        await this.yearSelect.click();
        await this.page.getByText(field.year.value, { exact: true }).click();

        await this.monthSelect.click();
        await this.page.getByText(field.month.value, { exact: true }).click();

        await this.daySelect.click();
        await this.page.getByText(field.day.value, { exact: true }).click();
      }
    }
  }

  public async registerNewUser(userData: UserData): Promise<void> {
    const mappedUser: RegUser = this.mapUserDataToRegUser(userData);
    await this.fillSignUpFormInputs(mappedUser);
    await this.selectBirthDate(mappedUser);
    await this.submitRegFormButton.click();
  }
}
