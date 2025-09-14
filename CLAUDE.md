# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based news feed application built with TypeScript, Redux, and SASS. The app fetches news articles from newsapi.org and displays them in a responsive interface with theming support.

## Environment Setup

### Node.js Requirements
This project requires **Node.js 22 LTS** (the latest LTS version). This is the only supported Node.js version.

- Use `nvm use` to automatically switch to the correct version (reads from `.nvmrc`)
- Or manually install Node.js 22 from [nodejs.org](https://nodejs.org/)

### Environment Variables
Create a `.env` file in the project root with:
```
SASS_PATH=./node_modules;./src
HTTPS=true
PORT=8443
REACT_APP_API_KEY=ENTER_YOUR_API_KEY_HERE
```

The `REACT_APP_API_KEY` should be obtained from [newsapi.org](https://newsapi.org/register).

## Common Commands

### Development
- `npm start` - Start development server (runs on port 8443 with HTTPS)
- `npm run build` - Create production build
- `npm test` - Run tests in watch mode
- `npm run test-coverage` - Generate test coverage report
- `npm run lint` - Run ESLint with caching
- `npm run lint-fix` - Auto-fix linting issues
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook for deployment

### Package Management
Use `npm install --legacy-peer-deps` when installing new packages due to TypeScript version conflicts with react-scripts.

## Architecture

### State Management
- **Redux Store**: Configured in `src/configureStore.ts` with redux-thunk middleware
- **Reducers**: Located in `src/services/reducers/`
  - `newsPreviewReducer` - Manages article data and loading states
  - `newsCountrySourceReducer` - Handles country selection and localization
- **Actions**: Defined in `src/services/actions/newsActions.ts`

### API Layer
- **Axios Service**: Singleton HTTP client in `src/services/axios-service.ts`
- **CORS Proxy**: Uses `cors-anywhere.citadel.red` for development to bypass newsapi.org CORS restrictions
- **Authentication**: API key is automatically added to requests via axios interceptors
- **Country Selection**: Automatically appends country parameter to API requests based on user selection

### Routing
- **React Router v6**: Single-page application with client-side routing
- **Main Route**: `/` displays top news (TOP_NEWS_ROUTE)
- **Fallback**: All other routes redirect to main page

### Internationalization
- **i18next**: Configured in `src/i18n/index.js` with browser language detection
- **Translation Files**: Located in `src/i18n/translations/languages/`
- **Usage**: Components use `useTranslation()` hook for localized strings

### Theming System
- **SASS Architecture**: Modular SASS with theme variables
- **Theme Files**:
  - `src/style/_themes.scss` - Light/dark theme definitions
  - `src/style/_variables.scss` - Color and spacing variables
- **Theme Switching**: Manual theme selection by changing `<body class="theme-light">` to `<body class="theme-dark">` in index.html
- **Component Theming**: Uses `@include themify()` mixin for theme-aware styling

### Component Structure
- **Pages**: Top-level route components in `src/pages/`
- **Components**: Reusable UI components in `src/components/`
- **Stories**: Storybook stories co-located with components
- **Testing**: Jest/React Testing Library tests alongside components

### TypeScript Configuration
- **Strict Mode**: Disabled for easier migration (`"strict": false`)
- **No Implicit Any**: Disabled (`"noImplicitAny": false`)
- **JSX**: Uses `react-jsx` transform for React 18
- **Coverage**: Jest configured to collect coverage from `src/**/*.{js,jsx,ts,tsx}`

## Development Notes

### API Integration
The app integrates with newsapi.org API. The axios service automatically:
- Adds Bearer token authentication
- Appends country parameter based on user selection
- Routes through CORS proxy in development
- Handles request caching with no-cache headers

### Known Issues
- Development server may fail to start due to ajv dependency conflicts
- Use `npm install --legacy-peer-deps` to resolve peer dependency issues
- SASS deprecation warnings are expected (legacy API usage)

### Testing Strategy
- Unit tests for components using React Testing Library
- Coverage collection excludes stories and root-level files
- Run single test: `npm test -- --testNamePattern="ComponentName"`