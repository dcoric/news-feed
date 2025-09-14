# Continuous Integration (CI) Setup

This project uses GitHub Actions for continuous integration and automated testing.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

**Jobs:**

#### Test Job
- **Matrix Strategy**: Tests on Node.js 18.x and 20.x
- **Steps:**
  1. Checkout code
  2. Setup Node.js with npm cache
  3. Install dependencies (`npm ci`)
  4. Run linting (`npm run lint`)
  5. Run tests with coverage (`npm run test-coverage`)
  6. Upload coverage to Codecov
  7. Comment coverage on PRs

#### Build Job
- **Dependencies**: Runs after test job passes
- **Steps:**
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Build project (`npm run build`)
  5. Upload build artifacts

### 2. Validate Workflow (`validate.yml`)

**Triggers:**
- Manual dispatch only

**Purpose:**
- Validates CI configuration
- Tests package.json syntax
- Checks workflow file syntax
- Verifies npm scripts exist

## Coverage Reports

- **Codecov Integration**: Coverage reports are automatically uploaded to Codecov
- **PR Comments**: Coverage changes are commented on pull requests
- **Coverage File**: `./coverage/lcov.info`

## Build Artifacts

- Build files are uploaded as artifacts and retained for 7 days
- Artifacts are available in the Actions tab of the GitHub repository

## Local Testing

To test the CI workflow locally:

```bash
# Run the same commands as CI
npm ci
npm run lint
npm run test-coverage
npm run build
```

## Requirements

- Node.js 18.x or 20.x
- npm (comes with Node.js)
- All tests must pass
- No linting errors
- Build must succeed

## Troubleshooting

### Common Issues

1. **Tests failing**: Check that all tests pass locally with `npm run test-coverage`
2. **Linting errors**: Run `npm run lint-fix` to auto-fix issues
3. **Build failures**: Ensure `npm run build` works locally
4. **Coverage upload failures**: Check Codecov configuration and secrets

### Workflow Status

- ✅ Green: All checks passed
- ❌ Red: One or more checks failed
- 🟡 Yellow: Workflow is running or pending
