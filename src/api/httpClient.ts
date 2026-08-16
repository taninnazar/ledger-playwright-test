import { type APIRequestContext, type APIResponse } from '@playwright/test';
import type { ApiResult } from '../types';

export class HttpClient {
  constructor(private readonly request: APIRequestContext) { }

  async post(url: string, options?: { data?: unknown; token?: string }): Promise<ApiResult> {
    const response = await this.request.post(url, {
      data: options?.data,
      headers: this.headers(options?.token),
    });
    return { response, body: await this.parseBody(response) };
  }

  async get(url: string, token?: string): Promise<ApiResult> {
    const response = await this.request.get(url, { headers: this.headers(token) });
    return { response, body: await this.parseBody(response) };
  }

  async delete(url: string, token: string): Promise<ApiResult> {
    const response = await this.request.delete(url, { headers: this.headers(token) });
    return { response, body: await this.parseBody(response) };
  }

  private headers(token?: string): { Authorization?: string } {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async parseBody(response: APIResponse): Promise<string | undefined> {
    const text = await response.text();
    if (!text) {
      return undefined;
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
}
