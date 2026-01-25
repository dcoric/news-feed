# Vite Migration Guide

This document outlines the changes made to convert the project from Create React App (CRA) to Vite.

## What Was Changed

### 1. Package.json
- **Removed**: `react-scripts@5.0.1` (CRA dependencies)
- **Added**: `vite@6.0.1` and `@vitejs/plugin-react`
- **Updated Scripts**:
  - `npm start` → `npm run start` (runs Vite dev server)
  - `npm run build` → `npm run build` (runs Vite build)
  - Added `npm run dev` and `npm run preview` for Vite-specific commands

### 2. Configuration Files
- **Created**: `vite.config.ts` - Vite configuration with:
  - React plugin
  - HTTPS server on port 8443
  - Proxy configuration for API requests
  - Build output to `build/` folder
- **Created**: `index.html` at the repo root (Vite entry point)
- **Updated**: `tsconfig.json` - Changed `moduleResolution` from `node` to `bundler` for Vite compatibility
- **Removed**: `public/index.html` (CRA-only entry point)

### 3. Environment Variables
- **Updated**: `.env.example` and `.env` - Changed `REACT_APP_*` prefix to `VITE_*` prefix (Vite-specific)

### 4. Removed Files
- **Deleted**: `src/serviceWorker.js` (CRA-specific service worker file)

## What You Need To Do

### Step 1: Install Dependencies
```bash
npm install --legacy-peer-deps
```

This will install Vite and remove react-scripts (if not already done). You may need to remove react-scripts manually if it's still listed:
```bash
npm uninstall react-scripts
```

### Step 2: Run Development Server
```bash
npm start
```

This will start the Vite development server on port 8443 with HTTPS enabled.

### Step 3: Test the Build
```bash
npm run build
```

This will create a production build in the `build/` folder.

### Step 4: Preview Production Build
```bash
npm run preview
```

This will preview the production build locally.

## Differences from CRA

### Hot Module Replacement (HMR)
Vite provides faster HMR than CRA, showing changes almost instantly.

### Build Times
Vite builds are significantly faster than CRA, especially for larger applications.

### Environment Variables
- CRA: Environment variables must start with `REACT_APP_`
- Vite: Environment variables must start with `VITE_`

### Server Configuration
- CRA: Server configuration is in `package.json`
- Vite: Server configuration is in `vite.config.ts`

### Entry Point
- CRA: Uses `public/index.html` as entry with build script injection
- Vite: Uses `public/index.html` directly with ES module imports

## Known Issues

### npm install Timeout
If `npm install` times out, try:
```bash
npm install --legacy-peer-deps --prefer-offline
```

### TypeScript Errors
If you encounter TypeScript errors after migration, ensure your `.env` file uses `VITE_` prefix:
- Wrong: `REACT_APP_API_KEY=your_key`
- Correct: `VITE_API_KEY=your_key`

### Testing
- Jest configuration is in `jest.config.js`
- Tests run with `npm test` (uses `jest`, not `react-scripts`)

## Migration Checklist

- [ ] Run `npm install --legacy-peer-deps`
- [ ] Run `npm start` to verify development server works
- [ ] Run `npm run build` to verify production build works
- [ ] Run `npm test` to verify tests still pass
- [ ] Update any remaining CRA-specific code if needed

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vite + React Guide](https://vitejs.dev/guide/features.html#react)
- [Migrating from CRA to Vite](https://vitejs.dev/guide/migration.html)
