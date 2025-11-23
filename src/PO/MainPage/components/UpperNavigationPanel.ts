import BaseComponent from '../../../Base/BaseComponent';

export default class UpperNavigationPanel extends BaseComponent {
  readonly navPanelButton = (buttonName: string) =>
    this.page
      .locator('.sub-navigation-content ')
      .getByRole('link', { name: buttonName, exact: true });
}
