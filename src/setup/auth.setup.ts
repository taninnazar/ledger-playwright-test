import { expect, test as setup } from '@playwright/test';
import { HttpClient } from '../api/httpClient';
import { UsersApi } from '../api/usersApi';
import { saveAuthSession } from '../config/auth';
import { testUser } from '../config/env';

setup('ensure shared test user is logged in', async ({ request }) => {
  const usersApi = new UsersApi(new HttpClient(request));
  let auth = await usersApi.login(testUser.email, testUser.password);

  if (auth.response.status() !== 200) {
    await usersApi.register(testUser);
    auth = await usersApi.login(testUser.email, testUser.password);
  }

  expect(auth.response.status()).toBe(200);
  saveAuthSession({
    ...testUser,
    token: auth.body.token,
    userId: auth.body.user._id,
  });
});
