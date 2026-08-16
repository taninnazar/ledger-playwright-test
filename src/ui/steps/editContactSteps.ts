import { uiRoutes } from '../../config/routes';
import type { ContactPayload } from '../../types';
import { EditContactPage } from '../pages/editContactPage';
import { BaseSteps } from './baseSteps';

export class EditContactSteps extends BaseSteps {
  constructor(private readonly editContactPage: EditContactPage) {
    super(editContactPage.page);
  }

  async fillTheForm(contact: ContactPayload): Promise<void> {
    await this.editContactPage.firstNameInput.fill(contact.firstName);
    await this.editContactPage.lastNameInput.fill(contact.lastName);
    if (contact.email) {
      await this.editContactPage.emailInput.fill(contact.email);
    }
    if (contact.phone) {
      await this.editContactPage.phoneInput.fill(contact.phone);
    }
    if (contact.city) {
      await this.editContactPage.cityInput.fill(contact.city);
    }
  }

  async submit(): Promise<void> {
    await this.editContactPage.submitButton.click();
    await this.waitForPath(uiRoutes.contactDetails);
  }
}
