import { createContactData } from '../../src/data/factories';
import { expect, test } from '../../src/fixtures/test';

test.describe('API: Delete Contact', () => {
  let contactId: string | undefined;

  test.afterEach(async ({ contactsApi, registeredUser }) => {
    if (contactId) {
      await contactsApi.delete(registeredUser.token, contactId);
    }
  });

  test('deletes a contact and no longer returns it from the API', async ({
    contactsApi,
    registeredUser,
  }) => {
    const created = await contactsApi.create(registeredUser.token, createContactData());
    contactId = created.body._id;
    expect(created.response.status()).toBe(201);

    const deleted = await contactsApi.delete(registeredUser.token, created.body._id);
    expect(deleted.response.status()).toBe(200);
    expect(deleted.body).toBe('Contact deleted');

    const fetched = await contactsApi.getById(registeredUser.token, created.body._id);
    expect(fetched.response.status()).toBe(404);

    const list = await contactsApi.list(registeredUser.token);
    expect(list.response.status()).toBe(200);
    expect(list.body.some((contact) => contact._id === created.body._id)).toBe(false);
  });
});
