import { type APIResponse } from '@playwright/test';

export type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type AuthSession = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  userId: string;
};

export type ContactPayload = {
  firstName: string;
  lastName: string;
  birthdate?: string;
  email?: string;
  phone?: string;
  street1?: string;
  street2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
};

export type Contact = {
  _id: string;
  owner: string;
  firstName: string;
  lastName: string;
  birthdate?: string;
  email?: string;
  phone?: string;
  street1?: string;
  street2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
};

export type ApiResult = {
  response: APIResponse;
  body: unknown;
};

export type AuthApiResult = {
  response: APIResponse;
  body: AuthResponse;
};

export type ContactApiResult = {
  response: APIResponse;
  body: Contact;
};

export type ContactListApiResult = {
  response: APIResponse;
  body: Contact[];
};

export type DeleteContactApiResult = {
  response: APIResponse;
  body: string;
};
