import { apiRoutes } from '../config/routes';
import type { Contact, ContactApiResult, ContactListApiResult, ContactPayload, DeleteContactApiResult } from '../types';
import { HttpClient } from './httpClient';

export class ContactsApi {
  constructor(private readonly http: HttpClient) {}

  async create(token: string, contact: ContactPayload): Promise<ContactApiResult> {
    const { response, body } = await this.http.post(apiRoutes.contacts, { data: contact, token });
    return { response, body: body as Contact };
  }

  async list(token: string): Promise<ContactListApiResult> {
    const { response, body } = await this.http.get(apiRoutes.contacts, token);
    return { response, body: body as Contact[] };
  }

  async getById(token: string, id: string): Promise<ContactApiResult> {
    const { response, body } = await this.http.get(apiRoutes.contact(id), token);
    return { response, body: body as Contact };
  }

  async delete(token: string, id: string): Promise<DeleteContactApiResult> {
    const { response, body } = await this.http.delete(apiRoutes.contact(id), token);
    return { response, body: String(body ?? '') };
  }
}
