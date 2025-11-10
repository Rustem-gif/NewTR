import BasePage from '../../Base/BasePage';

export default class PrivacyAndManagementOfPersonalData extends BasePage {
  public privacyAndManagementOfPersonalDataPageContent = this.page.locator(
    '.static-page-content-container'
  );
}
