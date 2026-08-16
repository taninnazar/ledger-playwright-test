import { uiRoutes } from '../../config/routes';
import { LoginPage } from '../pages/loginPage';
import { BaseSteps } from './baseSteps';

export class LoginSteps extends BaseSteps {
  constructor(private readonly loginPage: LoginPage) {
    super(loginPage.page);
  }

  async goto(): Promise<void> {
    await this.page.goto(uiRoutes.login);
    await this.loginPage.submitButton.waitFor();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginPage.emailInput.fill(email);
    await this.loginPage.passwordInput.fill(password);
    await this.loginPage.submitButton.click();
    await this.waitForPath(uiRoutes.contactList);
  }

  async openSignUp(): Promise<void> {
    await this.loginPage.signUpButton.click();
    await this.waitForPath(uiRoutes.signup);
  }
}
