import { createContactData } from '../../src/data/factories';
import { expect, loggedInTest as test } from '../../src/fixtures/test';

test.describe('UI: Create Contact', () => {
  const contact = createContactData();

  test.afterEach(async ({ contactsApi, registeredUser }) => {
    const list = await contactsApi.list(registeredUser.token);
    const created = list.body.find((item) => item.email === contact.email);
    if (created) {
      await contactsApi.delete(registeredUser.token, created._id);
    }
  });

  test('creates a new contact with valid data and shows it in the list', async ({
    contactListPage,
    contactListSteps,
    addContactSteps,
  }) => {
    await contactListSteps.goto();
    await expect(contactListPage.heading).toBeVisible();
    await contactListSteps.addNewContact();
    await addContactSteps.fill(contact);
    await addContactSteps.submit();

    const row = contactListSteps.rowFor(contact);
    await expect(row).toBeVisible();
    await expect(row).toContainText(contact.email!);
  });
});
