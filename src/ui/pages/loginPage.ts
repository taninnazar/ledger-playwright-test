import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly emailInput = this.byId('email');
  readonly passwordInput = this.byId('password');
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly signUpButton = this.page.getByRole('button', { name: 'Sign up' });
  readonly errorMessage = this.byId('error');
}
