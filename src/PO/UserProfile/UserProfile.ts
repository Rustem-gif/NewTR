import { Locator } from '@playwright/test';
import BasePage from '../../Base/BasePage';
import ActivityHub from './Components/Activity';
import Wallet from './Components/Wallet';
import Settings from './Components/Settings';
import Profile from './Components/Profile';
import Notifications from './Components/Notifications';

type UserProfileSections = 'Activity' | 'Wallet' | 'Settings' | 'Profile' | 'Notifications';
type UserProfileComponent = ActivityHub | Wallet | Settings | Profile | Notifications;

export default class UserProfile extends BasePage {
  readonly sectionTab: (section: UserProfileSections) => Locator = section =>
    this.page.getByRole('link', { name: section, exact: true });

  async openSection(section: UserProfileSections): Promise<UserProfileComponent> {
    await this.clickOn(this.sectionTab(section));

    switch (section) {
      case 'Activity':
        return new ActivityHub(this.page);

      case 'Wallet':
        return new Wallet(this.page);

      case 'Settings':
        return new Settings(this.page);

      case 'Profile':
        return new Profile(this.page);
      case 'Notifications':
        return new Notifications(this.page);
    }
  }
}
