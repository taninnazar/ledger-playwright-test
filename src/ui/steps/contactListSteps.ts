import { type Locator } from '@playwright/test';
import { uiRoutes } from '../../config/routes';
import type { ContactPayload } from '../../types';
import { ContactListPage } from '../pages/contactListPage';
import { BaseSteps } from './baseSteps';

export class ContactListSteps extends BaseSteps {
  constructor(private readonly contactListPage: ContactListPage) {
    super(contactListPage.page);
  }

  async goto(): Promise<void> {
    await this.page.goto(uiRoutes.contactList);
  }

  async addNewContact(): Promise<void> {
    await this.contactListPage.addContactButton.click();
    await this.waitForPath(uiRoutes.addContact);
  }

  async logout(): Promise<void> {
    await this.contactListPage.logoutButton.click();
    await this.waitForPath(uiRoutes.login);
  }

  rowFor(contact: ContactPayload): Locator {
    return this.contactListPage.contactRows.filter({
      hasText: `${contact.firstName} ${contact.lastName}`,
    });
  }

  async openContact(contact: ContactPayload): Promise<void> {
    await this.rowFor(contact).click();
    await this.waitForPath(uiRoutes.contactDetails);
  }
}
