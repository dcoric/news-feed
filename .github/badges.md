# CI/CD Badges

Add these badges to your README.md to show the status of your CI/CD pipeline:

## GitHub Actions Badge

```markdown
![CI](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/workflows/CI/badge.svg)
```

## Codecov Badge

```markdown
[![codecov](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY)
```

## Example README Section

```markdown
# News Feed

[![CI](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/workflows/CI/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/actions)
[![codecov](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY)

A React-based news feed application with Redux state management.

## Features

- 📰 Top news display
- 🌍 Multi-country support
- 🎨 Modern UI with SCSS
- ✅ Comprehensive test coverage
- 🚀 Automated CI/CD pipeline

## Development

### Prerequisites

- Node.js 18.x or 20.x
- npm

### Setup

```bash
npm install
npm start
```

### Testing

```bash
npm run test-coverage
```

### Linting

```bash
npm run lint
npm run lint-fix  # Auto-fix issues
```

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Tests**: Runs on Node.js 18.x and 20.x
- **Coverage**: Reports to Codecov
- **Build**: Creates production build artifacts
- **Linting**: ESLint with React Testing Library rules

See [CI.md](.github/CI.md) for detailed information.
```

## Badge URLs

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your actual GitHub username and repository name.

### Status Badges

- **CI Status**: `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/workflows/CI/badge.svg`
- **Codecov**: `https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY/branch/main/graph/badge.svg`

### Links

- **CI Actions**: `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/actions`
- **Codecov Dashboard**: `https://codecov.io/gh/YOUR_USERNAME/YOUR_REPOSITORY`
