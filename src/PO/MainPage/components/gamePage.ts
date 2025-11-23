import { Locator } from '@playwright/test';
import BaseComponent from '../../../Base/BaseComponent';
import Header from '../../../components/Header/Header';

export default class GamePage extends BaseComponent {
  readonly gameFrame: Locator = this.page.locator('.iframe-holder').describe('Game frame');
  readonly header: Header = new Header(this.page);
}
