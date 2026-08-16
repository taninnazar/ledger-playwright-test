import { uiRoutes } from '../../config/routes';
import { ContactDetailsPage } from '../pages/contactDetailsPage';
import { BaseSteps } from './baseSteps';

export class ContactDetailsSteps extends BaseSteps {
  constructor(private readonly contactDetailsPage: ContactDetailsPage) {
    super(contactDetailsPage.page);
  }

  async editContact(): Promise<void> {
    await this.contactDetailsPage.editButton.click();
    await this.waitForPath(uiRoutes.editContact);
  }

  async returnToList(): Promise<void> {
    await this.contactDetailsPage.returnButton.click();
    await this.waitForPath(uiRoutes.contactList);
  }
}
