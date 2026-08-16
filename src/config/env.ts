import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

function loadEnvFile(): void {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

export const config = {
  baseURL: process.env.BASE_URL ?? 'https://thinking-tester-contact-list.herokuapp.com',
} as const;

export const testUser = {
  firstName: process.env.TEST_USER_FIRST_NAME ?? 'Ledger',
  lastName: process.env.TEST_USER_LAST_NAME ?? 'Tester',
  email: process.env.TEST_USER_EMAIL ?? '',
  password: process.env.TEST_USER_PASSWORD ?? '',
} as const;
