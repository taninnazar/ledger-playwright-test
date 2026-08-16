import { BasePage } from './basePage';

export class SignupPage extends BasePage {
  readonly firstNameInput = this.byId('firstName');
  readonly lastNameInput = this.byId('lastName');
  readonly emailInput = this.byId('email');
  readonly passwordInput = this.byId('password');
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly errorMessage = this.byId('error');
}
