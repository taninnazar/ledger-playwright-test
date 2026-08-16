import { createContactData } from '../../src/data/factories';
import { expect, test } from '../../src/fixtures/test';

test.describe('API: Create Contact', () => {
  let contactId: string | undefined;

  test.afterEach(async ({ contactsApi, registeredUser }) => {
    if (contactId) {
      await contactsApi.delete(registeredUser.token, contactId);
    }
  });

  test('creates a contact and retrieves it by id and in the contact list', async ({
    contactsApi,
    registeredUser,
  }) => {
    const payload = createContactData();
    const created = await contactsApi.create(registeredUser.token, payload);
    contactId = created.body._id;

    expect(created.response.status()).toBe(201);
    expect(created.body).toMatchObject(payload);
    expect(created.body._id).toBeTruthy();
    expect(created.body.owner).toBe(registeredUser.userId);

    const fetched = await contactsApi.getById(registeredUser.token, created.body._id);
    expect(fetched.response.status()).toBe(200);
    expect(fetched.body).toMatchObject({ _id: created.body._id, ...payload });

    const list = await contactsApi.list(registeredUser.token);
    expect(list.response.status()).toBe(200);
    expect(list.body.some((contact) => contact._id === created.body._id)).toBe(true);
  });
});
