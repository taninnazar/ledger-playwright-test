import { type Locator } from '@playwright/test';
import { uiRoutes } from '../../config/routes';
import type { ContactPayload } from '../../types';
import { AddContactPage } from '../pages/addContactPage';
import { BaseSteps } from './baseSteps';

export class AddContactSteps extends BaseSteps {
  constructor(private readonly addContactPage: AddContactPage) {
    super(addContactPage.page);
  }

  async fill(contact: ContactPayload): Promise<void> {
    await this.addContactPage.firstNameInput.fill(contact.firstName);
    await this.addContactPage.lastNameInput.fill(contact.lastName);
    await this.fillOptional(this.addContactPage.birthdateInput, contact.birthdate);
    await this.fillOptional(this.addContactPage.emailInput, contact.email);
    await this.fillOptional(this.addContactPage.phoneInput, contact.phone);
    await this.fillOptional(this.addContactPage.street1Input, contact.street1);
    await this.fillOptional(this.addContactPage.street2Input, contact.street2);
    await this.fillOptional(this.addContactPage.cityInput, contact.city);
    await this.fillOptional(this.addContactPage.stateProvinceInput, contact.stateProvince);
    await this.fillOptional(this.addContactPage.postalCodeInput, contact.postalCode);
    await this.fillOptional(this.addContactPage.countryInput, contact.country);
  }

  async submit(): Promise<void> {
    await this.addContactPage.submitButton.click();
    await this.waitForPath(uiRoutes.contactList);
  }

  private async fillOptional(locator: Locator, value?: string): Promise<void> {
    if (value) {
      await locator.fill(value);
    }
  }
}
