import { BasePage } from './basePage';

export class EditContactPage extends BasePage {
  readonly firstNameInput = this.byId('firstName');
  readonly lastNameInput = this.byId('lastName');
  readonly emailInput = this.byId('email');
  readonly phoneInput = this.byId('phone');
  readonly cityInput = this.byId('city');
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
}
