import { BasePage } from './basePage';

export class AddContactPage extends BasePage {
  readonly firstNameInput = this.byId('firstName');
  readonly lastNameInput = this.byId('lastName');
  readonly birthdateInput = this.byId('birthdate');
  readonly emailInput = this.byId('email');
  readonly phoneInput = this.byId('phone');
  readonly street1Input = this.byId('street1');
  readonly street2Input = this.byId('street2');
  readonly cityInput = this.byId('city');
  readonly stateProvinceInput = this.byId('stateProvince');
  readonly postalCodeInput = this.byId('postalCode');
  readonly countryInput = this.byId('country');
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
}
