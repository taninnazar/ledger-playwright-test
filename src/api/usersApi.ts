import { apiRoutes } from '../config/routes';
import type { AuthApiResult, AuthResponse, UserPayload } from '../types';
import { HttpClient } from './httpClient';

export class UsersApi {
  constructor(private readonly http: HttpClient) {}

  async register(user: UserPayload): Promise<AuthApiResult> {
    const { response, body } = await this.http.post(apiRoutes.users, { data: user });
    return { response, body: body as AuthResponse };
  }

  async login(email: string, password: string): Promise<AuthApiResult> {
    const { response, body } = await this.http.post(apiRoutes.login, { data: { email, password } });
    return { response, body: body as AuthResponse };
  }

  async logout(token: string) {
    return this.http.post(apiRoutes.logout, { token });
  }

  async deleteCurrentUser(token: string) {
    return this.http.delete(apiRoutes.me, token);
  }
}
