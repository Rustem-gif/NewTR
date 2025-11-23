import Footer from '../components/Footer/Footer';
import Base from './Base';

export default class BasePage extends Base {
  readonly footer: Footer = new Footer(this.page);
}
