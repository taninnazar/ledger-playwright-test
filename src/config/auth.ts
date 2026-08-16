import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { AuthSession } from '../types';

export const authFilePath = path.join(process.cwd(), 'playwright/.auth/user.json');

export function saveAuthSession(session: AuthSession): void {
  mkdirSync(path.dirname(authFilePath), { recursive: true });
  writeFileSync(authFilePath, JSON.stringify(session, null, 2));
}

export function loadAuthSession(): AuthSession {
  return JSON.parse(readFileSync(authFilePath, 'utf-8')) as AuthSession;
}
