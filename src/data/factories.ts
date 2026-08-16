import { faker } from '@faker-js/faker';
import type { ContactPayload, UserPayload } from '../types';

export function createUserData(): UserPayload {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `qa.${faker.string.uuid()}@example.com`,
    password: 'Password123!',
  };
}

export function createContactData(): ContactPayload {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate({ min: 21, max: 65, mode: 'age' }).toISOString().slice(0, 10),
    email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
    phone: `800555${faker.string.numeric(4)}`,
    street1: faker.location.streetAddress(),
    street2: 'Apt 2',
    city: faker.location.city(),
    stateProvince: faker.location.state({ abbreviated: true }),
    postalCode: faker.string.numeric({ length: 5, allowLeadingZeros: false }),
    country: 'USA',
  };
}
