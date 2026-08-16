import { test as base, type Page } from '@playwright/test';
import { ContactsApi } from '../api/contactsApi';
import { HttpClient } from '../api/httpClient';
import { UsersApi } from '../api/usersApi';
import { loadAuthSession } from '../config/auth';
import { config } from '../config/env';
import type { AuthSession } from '../types';
import { AddContactPage } from '../ui/pages/addContactPage';
import { ContactDetailsPage } from '../ui/pages/contactDetailsPage';
import { ContactListPage } from '../ui/pages/contactListPage';
import { EditContactPage } from '../ui/pages/editContactPage';
import { LoginPage } from '../ui/pages/loginPage';
import { SignupPage } from '../ui/pages/signupPage';
import { AddContactSteps } from '../ui/steps/addContactSteps';
import { ContactDetailsSteps } from '../ui/steps/contactDetailsSteps';
import { ContactListSteps } from '../ui/steps/contactListSteps';
import { EditContactSteps } from '../ui/steps/editContactSteps';
import { LoginSteps } from '../ui/steps/loginSteps';
import { SignupSteps } from '../ui/steps/signupSteps';

type AppFixtures = {
  usersApi: UsersApi;
  contactsApi: ContactsApi;
  registeredUser: AuthSession;
  loginSteps: LoginSteps;
  signupSteps: SignupSteps;
  contactListPage: ContactListPage;
  contactListSteps: ContactListSteps;
  addContactSteps: AddContactSteps;
  contactDetailsPage: ContactDetailsPage;
  contactDetailsSteps: ContactDetailsSteps;
  editContactPage: EditContactPage;
  editContactSteps: EditContactSteps;
};

export const test = base.extend<AppFixtures>({
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(new HttpClient(request)));
  },

  contactsApi: async ({ request }, use) => {
    await use(new ContactsApi(new HttpClient(request)));
  },

  registeredUser: async ({}, use) => {
    await use(loadAuthSession());
  },

  loginSteps: async ({ page }, use) => {
    await use(new LoginSteps(new LoginPage(page)));
  },

  signupSteps: async ({ page }, use) => {
    await use(new SignupSteps(new SignupPage(page)));
  },

  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },

  contactListSteps: async ({ contactListPage }, use) => {
    await use(new ContactListSteps(contactListPage));
  },

  addContactSteps: async ({ page }, use) => {
    await use(new AddContactSteps(new AddContactPage(page)));
  },

  contactDetailsPage: async ({ page }, use) => {
    await use(new ContactDetailsPage(page));
  },

  contactDetailsSteps: async ({ contactDetailsPage }, use) => {
    await use(new ContactDetailsSteps(contactDetailsPage));
  },

  editContactPage: async ({ page }, use) => {
    await use(new EditContactPage(page));
  },

  editContactSteps: async ({ editContactPage }, use) => {
    await use(new EditContactSteps(editContactPage));
  },
});

type LoggedInFixtures = {
  page: Page;
};

export const loggedInTest = test.extend<LoggedInFixtures>({
  page: async ({ page, registeredUser }, use) => {
    await page.context().addCookies([
      {
        name: 'token',
        value: registeredUser.token,
        url: config.baseURL,
      },
    ]);
    await use(page);
  },
});

export { expect } from '@playwright/test';
