import { createUserData } from '../../src/data/factories';
import { expect, test } from '../../src/fixtures/test';

test.describe('UI: User Registration', () => {
  test('registers a new user and confirms access by logging in', async ({
    loginSteps,
    signupSteps,
    contactListSteps,
    contactListPage,
  }) => {
    const user = createUserData();

    await loginSteps.goto();
    await loginSteps.openSignUp();
    await signupSteps.register(user);
    await expect(contactListPage.heading).toBeVisible();
    await expect(contactListPage.addContactButton).toBeVisible();
    await expect(contactListPage.table).toBeVisible();

    await contactListSteps.logout();
    await loginSteps.login(user.email, user.password);
    await expect(contactListPage.heading).toBeVisible();
    await expect(contactListPage.addContactButton).toBeVisible();
    await expect(contactListPage.table).toBeVisible();
  });
});
