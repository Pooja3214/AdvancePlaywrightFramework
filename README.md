# Advance Playwright Framework

An advanced, production-ready test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It supports UI and API testing across multiple environments with built-in reporting, CI/CD integration, and a scalable project structure.

## Features

- **Playwright + TypeScript** — Modern browser and API automation
- **Page Object Model (POM)** — Scalable, maintainable UI tests with reusable page classes
- **Layered API Testing** — A raw-request suite, a reusable `ApiHelper`, a typed `BookingApi` service layer, and fixture-driven end-to-end flows
- **Multi-Environment Support** — Easily switch between QA, Stage, Dev, Prod, and API environments via environment variables
- **GitHub Actions CI/CD** — Automated test runs on push and pull requests
- **Rich Reporting** — HTML, list, and a custom reporter with video, screenshot, and trace capture on failures
- **Path Aliases** — Clean imports using `@api/*`, `@config/*`, `@fixtures/*`, `@pages/*`, `@testdata/*`, and `@utils/*`
- **Test Data Utilities** — faker-js/faker, CSV, and Excel support for data-driven testing
- **Runtime Schema Validation** — AJV + ajv-formats checks that API responses match their JSON schemas
- **JSONPath Queries** — `jsonpath-plus` helpers for extracting values from nested responses
- **Logging** — Winston logger included
- **AI Test Agents** — Built-in agents for flaky test analysis and root-cause detection
- **Allure Reporting Ready** — allure-playwright dependency available for enhanced reporting
- **Reference Docs** — In-depth write-ups under [`docs/`](docs/), including the [Playwright Worker guide](docs/Playwright-Worker.md)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser & API automation |
| TypeScript | Type-safe test code |
| dotenv | Environment configuration |
| Winston | Logging |
| AJV + ajv-formats | Runtime JSON schema validation |
| @faker-js/faker | Test data generation |
| csv-parse / xlsx | Data-driven test inputs |
| allure-playwright | Advanced test reporting |
| jsonpath-plus | JSON path queries |

## Project Structure

```
.
├── .github/workflows/         # CI/CD pipelines
├── docs/                      # Reference documentation and Postman collection
├── rules/                     # Shared team rules and conventions
├── src/
│   ├── ai/                    # AI-powered test agents (flaky test analyzer, RCA)
│   ├── api/                   # API service layer (e.g. BookingApi)
│   ├── config/                # Framework configuration and env helpers
│   ├── fixtures/              # Test fixtures and setup (UI base + booker fixture)
│   ├── pages/                 # Page Object Model (POM) classes
│   ├── testdata/              # Test data files (JSON, CSV, Excel) and JSON schemas
│   ├── tests/
│   │   ├── apisTests/         # API test suites (see API Testing below)
│   │   │   ├── 01_restfulbooker_raw/            # Raw Playwright request specs
│   │   │   ├── 02_restfulbooker_apiHelper/      # Specs built on ApiHelper
│   │   │   ├── 03_restfulbooker_fixture_e2e_api/# Fixture-driven e2e CRUD flows
│   │   │   ├── 04_jsonpath_plus/                # JSONPath query examples
│   │   │   └── 05_ajv_json_schema/              # AJV schema validation specs
│   │   ├── e2e/               # UI end-to-end checkout specs
│   │   └── login/             # UI login specs
│   └── utils/                 # Utilities (ApiHelper, SchemaValidator, logger, reporter)
├── logs/                      # Execution logs (generated, not committed)
├── reports/                   # HTML reports (generated, not committed)
├── tta-report/                # Custom test reports (generated, not committed)
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables (not committed)
└── .gitignore                 # Git ignore rules
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS recommended
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Pooja3214/AdvancePlaywrightFramework.git
cd AdvancePlaywrightFramework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

Create a `.env` file in the project root (or use the existing one). Example:

```env
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com
QA_BASE_URL=https://app.thetestingacademy.com
STG_BASE_URL=https://stage.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com
LOG_LEVEL=info
TEST_ENV=QA
TEST_AUTHOR=Pramod
USERNAME=admin
PASSWORD=ADMIN123
```

> **Note:** Never commit `.env` files containing credentials to version control.

## API Testing

The API suites target [restful-booker](https://restful-booker.herokuapp.com) and build up in layers, from raw requests to a typed service object:

| Suite | What it covers |
|-------|----------------|
| `01_restfulbooker_raw/` | Raw Playwright `request` calls: ping, POST, PUT, new-context usage, and a serial CRUD flow |
| `02_restfulbooker_apiHelper/` | The same operations wrapped in `ApiHelper` for create and update flows |
| `03_restfulbooker_fixture_e2e_api/` | Fixture-based end-to-end CRUD, plus negative cases (bad token, missing booking) |
| `04_jsonpath_plus/` | Extracting nested response values with JSONPath (`jsonpath-plus`) |
| `05_ajv_json_schema/` | Validating responses against JSON schemas at runtime with AJV |

**Building blocks**

- `src/utils/ApiHelper.ts` — Generic HTTP client wrapping `APIRequestContext` with GET/POST/PUT/PATCH/DELETE, query-param building, retry/polling, and response helpers (`isSuccess`, `parseJsonResponse`).
- `src/api/BookingApi.ts` — Typed service over `ApiHelper` for the booking domain, with a managed token lifecycle (auto re-auth on a 403) and typed payload/response interfaces.
- `src/fixtures/booker.fixture.ts` — Extends the Playwright test with `bookingApi` and a generated `bookerToken` fixture.
- `src/utils/SchemaValidator.ts` — AJV-based `validate`/`assertValid` helpers that report every schema violation at once.
- `src/testdata/booking.data.ts` and `src/testdata/schemas/` — Booking data builders and JSON schemas.

**Run the API suite**

```bash
# Whole API project (no browser launched)
npx playwright test --project=api

# A single suite
npx playwright test src/tests/apisTests/03_restfulbooker_fixture_e2e_api/ --project=api
```

## Running Tests

```bash
# Run all tests headlessly (default)
npm test

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# Show HTML report
npm run report

# Run a specific project or folder
npx playwright test --project=api
npx playwright test src/tests/apisTests/ --project=api
```

## Configuration

### Playwright Config (`playwright.config.ts`)

- **testDir:** `./src/tests`
- **baseURL** dynamically resolves based on `TTA_ENV` or `BASE_URL` environment variable
- **Timeout:** 60s per test, 10s for expect assertions
- **Retries:** 2 retries in CI, 0 locally
- **Parallelism:** `fullyParallel: true` (tests run in parallel even within the same file)
- **Reporters:** HTML, list, and a custom reporter (`src/utils/CustomReporter.ts`)
- **Artifacts:** Screenshot on failure (opt-in via `ATTACH_SCREENSHOTS`), video on, trace on

### Projects

| Project | testDir | Notes |
|---------|---------|-------|
| `chromium` | `./src/tests` | UI tests; ignores `apisTests` and `aiTest`, Desktop Chrome at 1920x1080 |
| `api` | `./src/tests/apisTests` | Pure HTTP; no browser devices, baseURL from `API_BASE_URL` |
| `ai` | `./src/tests/aiTest` | AI agent specs; longer 180s timeout |

### Supported Environments

| TTA_ENV | Resolved Base URL (default) |
|---------|---------------------------|
| `qa` | `https://app.thetestingacademy.com` |
| `stg` / `stage` / `staging` | `https://stage.thetestingacademy.com` |
| `dev` / `local` | `http://localhost:3000` |
| `prod` / `production` | `https://app.thetestingacademy.com` |
| `api` | `https://restful-booker.herokuapp.com` |

### Path Aliases

Defined in `tsconfig.json`:

| Alias | Maps to |
|-------|---------|
| `@api/*` | `src/api/*` |
| `@config/*` | `src/config/*` |
| `@fixtures/*` | `src/fixtures/*` |
| `@pages/*` | `src/pages/*` |
| `@testdata/*` | `src/testdata/*` |
| `@utils/*` | `src/utils/*` |

## CI/CD

This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Checks out code
2. Sets up Node.js LTS
3. Installs dependencies and Playwright browsers
4. Runs the test suite
5. Uploads the HTML report as an artifact (retained for 30 days)

Triggers: `push` and `pull_request` on `main` and `master` branches.

## Documentation

- [Playwright Worker Lanes](docs/Playwright-Worker.md) — How parallelism actually behaves on this repo, measured: worker counts, RAM ceilings, and how long a suite will take.
- [Postman Collection](docs/postman_api_collection/) — Importable collection for the restful-booker API.
- [JSONPath Cheatsheet](src/tests/apisTests/04_jsonpath_plus/jsonpath-cheatsheet.md) — Common JSONPath patterns used in the suite.
- [AJV Notes](src/tests/apisTests/05_ajv_json_schema/Notes.md) — Notes on runtime schema validation.

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `playwright test` | Run all tests |
| `test:headed` | `playwright test --headed` | Run tests in headed mode |
| `test:debug` | `playwright test --debug` | Debug tests |
| `report` | `playwright show-report` | Open HTML report |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational and training purposes. See repository for licensing details.

---

**Repository:** https://github.com/Pooja3214/AdvancePlaywrightFramework

---

*Last updated: September 2026*
