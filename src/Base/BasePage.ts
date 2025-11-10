import Footer from '../components/Footer/Footer';
import Base from './Base';

export default class BasePage extends Base {
  public footer: Footer = new Footer(this.page);
}
