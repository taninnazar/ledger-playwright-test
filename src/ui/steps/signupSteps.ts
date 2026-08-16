import { uiRoutes } from '../../config/routes';
import type { UserPayload } from '../../types';
import { SignupPage } from '../pages/signupPage';
import { BaseSteps } from './baseSteps';

export class SignupSteps extends BaseSteps {
  constructor(private readonly signupPage: SignupPage) {
    super(signupPage.page);
  }

  async goto(): Promise<void> {
    await this.page.goto(uiRoutes.signup);
    await this.signupPage.submitButton.waitFor();
  }

  async register(user: UserPayload): Promise<void> {
    await this.signupPage.firstNameInput.fill(user.firstName);
    await this.signupPage.lastNameInput.fill(user.lastName);
    await this.signupPage.emailInput.fill(user.email);
    await this.signupPage.passwordInput.fill(user.password);
    await this.signupPage.submitButton.click();
    await this.waitForPath(uiRoutes.contactList);
  }
}
