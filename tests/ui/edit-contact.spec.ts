import { createContactData } from '../../src/data/factories';
import { expect, loggedInTest as test } from '../../src/fixtures/test';
import type { Contact } from '../../src/types';

test.describe('UI: Edit Contact', () => {
  let contact: Contact;

  test.beforeEach(async ({ contactsApi, registeredUser }) => {
    const created = await contactsApi.create(registeredUser.token, createContactData());
    contact = created.body;
  });

  test.afterEach(async ({ contactsApi, registeredUser }) => {
    if (contact?._id) {
      await contactsApi.delete(registeredUser.token, contact._id);
    }
  });

  test('updates an existing contact and reflects the changes in the list', async ({
    contactListPage,
    contactListSteps,
    contactDetailsPage,
    contactDetailsSteps,
    editContactPage,
    editContactSteps,
  }) => {
    const updates = {
      ...createContactData(),
      firstName: 'Updated',
      lastName: 'Contact',
    };

    await contactListSteps.goto();
    await expect(contactListPage.heading).toBeVisible();

    const existingRow = contactListSteps.rowFor(contact);
    await expect(existingRow).toBeVisible();
    await expect(existingRow).toContainText(contact.email!);

    await contactListSteps.openContact(contact);
    await contactDetailsSteps.editContact();
    await expect(editContactPage.firstNameInput).toHaveValue(/.+/);
    await editContactSteps.fillTheForm(updates);
    await editContactSteps.submit();

    await expect(contactDetailsPage.firstName).toHaveText(updates.firstName);
    await expect(contactDetailsPage.lastName).toHaveText(updates.lastName);
    await expect(contactDetailsPage.email).toHaveText(updates.email!);

    await contactDetailsSteps.returnToList();
    const updatedRow = contactListPage.contactRows.filter({ hasText: updates.email! });
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText(`${updates.firstName} ${updates.lastName}`);
    await expect(contactListPage.contactRows.filter({ hasText: contact.email! })).toHaveCount(0);
  });
});
