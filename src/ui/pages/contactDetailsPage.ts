import { BasePage } from './basePage';

export class ContactDetailsPage extends BasePage {
  readonly editButton = this.page.getByRole('button', { name: 'Edit Contact' });
  readonly returnButton = this.page.getByRole('button', { name: 'Return to Contact List' });
  readonly firstName = this.byId('firstName');
  readonly lastName = this.byId('lastName');
  readonly email = this.byId('email');
}
