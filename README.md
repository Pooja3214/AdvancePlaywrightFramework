# Advance Playwright Framework

An advanced, production-ready test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It supports UI and API testing across multiple environments with built-in reporting, CI/CD integration, and scalable project structure.

## Features

- **Playwright + TypeScript** — Modern browser and API automation
- **Page Object Model (POM)** — Scalable, maintainable UI tests with reusable page classes
- **Multi-Environment Support** — Easily switch between QA, Stage, Dev, Prod, and API environments via environment variables
- **GitHub Actions CI/CD** — Automated test runs on push and pull requests
- **Rich Reporting** — HTML and list reporters with video, screenshot, and trace capture on failures; custom reporting utilities included
- **Path Aliases** — Clean imports using `@/*` mapped to `src/*`
- **Test Data Utilities** — faker-js/faker, CSV, and Excel support for data-driven testing
- **Logging & Validation** — Winston logger and AJV schema validation included
- **AI Test Agents** — Built-in agents for flaky test analysis and root-cause detection
- **Allure Reporting Ready** — allure-playwright dependency available for enhanced reporting

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser & API automation |
| TypeScript | Type-safe test code |
| dotenv | Environment configuration |
| Winston | Logging |
| AJV | JSON schema validation |
| @faker-js/faker | Test data generation |
| csv-parse / xlsx | Data-driven test inputs |
| allure-playwright | Advanced test reporting |
| jsonpath-plus | JSON path queries |

## Project Structure

```
.
├── .github/workflows/       # CI/CD pipelines
├── src/
│   ├── ai/                  # AI-powered test agents (flaky test analyzer, RCA)
│   ├── api/                 # API test helpers and schemas
│   ├── config/              # Framework configuration
│   ├── fixtures/            # Test fixtures and setup
│   ├── pages/               # Page Object Model (POM) classes
│   ├── testdata/            # Test data files (CSV, Excel, JSON)
│   ├── tests/               # Playwright test specs
│   └── utils/               # Utilities (logger, data generator, custom reporter)
├── logs/                    # Execution logs (generated, not committed)
├── reports/                 # HTML reports (generated, not committed)
├── tta-report/              # Custom test reports (generated, not committed)
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript compiler options
├── package.json             # Dependencies & scripts
├── .env                     # Environment variables (not committed)
└── .gitignore               # Git ignore rules
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
```

## Configuration

### Playwright Config (`playwright.config.ts`)

- **baseURL** dynamically resolves based on `TTA_ENV` or `BASE_URL` environment variable
- **Timeout:** 60s per test, 10s for expect assertions
- **Retries:** 2 retries in CI, 0 locally
- **Reporters:** HTML + list
- **Artifacts:** Screenshot on failure, video on, trace on first retry
- **Browser:** Chromium (Desktop Chrome)

### Supported Environments

| TTA_ENV | Resolved Base URL (default) |
|---------|---------------------------|
| `qa` | `https://app.thetestingacademy.com` |
| `stg` / `stage` / `staging` | `https://stage.thetestingacademy.com` |
| `dev` / `local` | `http://localhost:3000` |
| `prod` / `production` | `https://app.thetestingacademy.com` |
| `api` | `https://restful-booker.herokuapp.com` |

## CI/CD

This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Checks out code
2. Sets up Node.js LTS
3. Installs dependencies and Playwright browsers
4. Runs the test suite
5. Uploads the HTML report as an artifact (retained for 30 days)

Triggers: `push` and `pull_request` on `main` and `master` branches.

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

*Last updated: August 2026*
