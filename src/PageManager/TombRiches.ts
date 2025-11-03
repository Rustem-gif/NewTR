import Base from '../Base/Base';
import MainPage from '../PO/MainPage/MainPage';
import SignInPage from '../PO/SignInUp/SignInPage';
import SignUpPage from '../PO/SignInUp/SignUpPage';

export default class TombRiches extends Base {
  public mainPage: MainPage = new MainPage(this.page);
  public signInPage: SignInPage = new SignInPage(this.page);
  public signUpPage: SignUpPage = new SignUpPage(this.page);
}
