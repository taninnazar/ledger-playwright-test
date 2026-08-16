import { type Page } from '@playwright/test';

export abstract class BaseSteps {
  constructor(protected readonly page: Page) {}

  protected async waitForPath(path: string): Promise<void> {
    await this.page.waitForURL((url) => {
      const pathname = new URL(url).pathname;
      return pathname === path;
    });
  }
}
