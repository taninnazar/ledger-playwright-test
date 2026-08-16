import { BasePage } from './basePage';

export class ContactListPage extends BasePage {
  readonly heading = this.page.getByRole('heading', { name: 'Contact List' });
  readonly addContactButton = this.page.getByRole('button', { name: 'Add a New Contact' });
  readonly logoutButton = this.page.getByRole('button', { name: 'Logout' });
  readonly table = this.page.getByRole('table');
  readonly contactRows = this.page.locator('tr.contactTableBodyRow');
}
