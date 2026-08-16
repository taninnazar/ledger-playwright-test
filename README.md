# Contact List App — Playwright Test Framework

UI and API test automation for the [Contact List App](https://thinking-tester-contact-list.herokuapp.com/), written in TypeScript with Playwright.

This is a take-home skills exercise: a small, maintainable framework plus 3 UI and 3 API tests, with CI, HTML reporting, and Docker as optional extras.

## Prerequisites

- Node.js 22+
- npm 10+
- Docker (only if you want to run tests in a container)

## Setup

```bash
npm ci
npx playwright install chromium
```

Copy `.env.example` to `.env` (required for the shared test user):

```bash
cp .env.example .env
```

`src/config/env.ts` loads that file before tests run. You can change `BASE_URL` and `TEST_USER_*` there.

## Running tests

```bash
# All tests (UI + API)
npm test

# UI tests only
npm run test:ui

# API tests only
npm run test:api

# Headed Chromium (useful while debugging UI flows)
npm run test:headed

# Playwright Inspector
npm run test:debug
```

After a run:

```bash
npm run report
```

This opens the HTML report in `playwright-report/`. Failures also keep a screenshot, trace, and video.

## Docker

```bash
docker compose run --rm tests
```

Reports are written to `playwright-report/` and `test-results/` on the host.

## What is covered

| Area | Case | What it verifies |
| --- | --- | --- |
| UI | User registration | Sign-up from the login page, then logout + login with the same credentials |
| UI | Create contact | Authenticated user adds a contact; it appears in the list |
| UI | Edit contact | An existing contact is updated; the list shows the new values |
| API | Authentication | `POST /users/login` returns a JWT and the registered user |
| API | Create contact | `POST /contacts` then retrieve by id and in `GET /contacts` |
| API | Delete contact | `DELETE /contacts/:id` returns `Contact deleted`, then 404 / missing from the list |

API reference: [Contact List Postman docs](https://documenter.getpostman.com/view/4012288/TzK2bEa8).

## Design choices

**One tool for UI and API.** Playwright is used for both browser flows and HTTP calls (`APIRequestContext`). That keeps auth, base URL, and reporting in one place.

**Pages and steps for UI.** Locators live in `src/ui/pages`. User actions live in `src/ui/steps`. Assertions stay in the specs.

**Thin API clients.** `UsersApi` / `ContactsApi` wrap Playwright requests so tests assert on status codes and bodies rather than repeating URLs and headers.

**Shared test user.** Setup logs in a stable account (`qa.ledger.playwright@example.com` by default). If that user is missing, it registers once and then logs in. The session is saved to `playwright/.auth/user.json` and reused by API tests and logged-in UI tests. The registration UI test does not use this account: it creates a fresh user in the browser.

**Registration is still a full UI journey.** Sign-up auto-logs the user in. The registration test logs out and logs back in so “success” is proven the way the assignment asked: by doing login.

**Projects.** `setup` ensures the shared user exists and is logged in. `ui-chromium` and `api` depend on it.

## Layout

```
src/
  api/           HTTP client + users/contacts APIs
  config/        base URL and routes
  data/          user and contact factories
  fixtures/      Playwright fixtures (APIs, steps, logged-in page)
  setup/         login or create the shared test user
  types/         shared TypeScript types
  ui/pages/      locators for each screen
  ui/steps/      user actions and assertions built on those locators
tests/
  api/           API specs
  ui/            UI specs
```

## CI

`.github/workflows/playwright.yml` builds the same Docker image used locally and runs `docker compose run --rm tests` on every push and pull request. The HTML report is uploaded as a workflow artifact. CI retries twice to absorb Heroku cold starts.

## Notes / challenges

- **Heroku cold starts.** The app can take several seconds to wake up. Timeouts are generous, and CI retries failed tests.
- **Unique emails.** The API rejects duplicate emails. Factories generate `qa.<uuid>@example.com`.
- **Auth cookie vs JWT.** Login/register set a `token` cookie. UI tests that skip the login form add that cookie to the browser context. API tests send `Authorization: Bearer <token>`.
- **Login token lives longer than the register token.** Register `Set-Cookie` expires in ~11 minutes; login lasts much longer. Setup always logs in (after creating the user only if needed) and stores that token for the suite.
- **Delete contact is not JSON.** `DELETE /contacts/:id` returns the plain text `Contact deleted`. The HTTP client parses JSON when it can and otherwise returns the raw text.
- **Empty contact list still renders a table, but without `#myTable`.** The app only assigns that id when a row is appended. Loaded-state checks use the table role instead.

## Feedback (assignment)

- Time spent: less than 4 hours
- Confidence: fairly confident — the six required cases plus CI, HTML report, and Docker are in place. Remaining risk is mostly Heroku availability, not the framework itself.
