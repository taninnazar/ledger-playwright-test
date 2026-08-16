import { expect, test } from '../../src/fixtures/test';

test.describe('API: User Authentication', () => {
  test('authenticates a registered user and returns a valid token', async ({
    usersApi,
    registeredUser,
  }) => {
    const { response, body } = await usersApi.login(registeredUser.email, registeredUser.password);

    expect(response.status()).toBe(200);
    expect(body.token).toMatch(/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    expect(body.user).toMatchObject({
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      email: registeredUser.email,
    });
    expect(body.user._id).toBe(registeredUser.userId);
  });
});
