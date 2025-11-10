import { Locator } from '@playwright/test';
import BaseComponent from '../../../Base/BaseComponent';
import Header from '../../../components/Header/Header';

export default class GamePage extends BaseComponent {
  public gameFrame: Locator = this.page.locator('.iframe-holder');
  public header: Header = new Header(this.page);
}
