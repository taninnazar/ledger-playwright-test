import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  protected byId(id: string): Locator {
    return this.page.locator(`#${id}`);
  }
}
