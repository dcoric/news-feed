# Redux to Zustand Migration Plan

## Overview

Migrate the news feed app from Redux + redux-thunk to Zustand. The current codebase has a simple state shape (2 reducers, 2 action creators), making this a straightforward migration.

### Current Redux Architecture

| File | Purpose |
|------|---------|
| `src/configureStore.ts` | Creates Redux store with thunk middleware |
| `src/services/reducers/index.ts` | Combines 2 reducers |
| `src/services/reducers/newsPreviewReducer.ts` | Article data + loading state (`fetching`, `fetched`, `error`, `data`) |
| `src/services/reducers/newsCountrySourceReducer.ts` | Country selection (`data`, `longName`) |
| `src/services/actions/newsActions.ts` | Thunk actions: `fetchTopNews`, `setCountryNewsSource` |
| `src/services/reducers/types.ts` | Action type constants |

### Components using Redux
- **`TopNewsPage.tsx`** - `useSelector` (3 selectors), `useDispatch` (fetchTopNews)
- **`Header/header.tsx`** - `useDispatch` (setCountryNewsSource)

---

## Migration Steps

### Phase 1: Add Zustand and create stores

1. **Install Zustand**
   ```
   npm install zustand
   ```

2. **Create `src/services/store/newsPreviewStore.ts`**
   - Replace `newsPreviewReducer` + `fetchTopNews` thunk
   - State: `{ fetching: boolean, fetched: boolean, error: string | null, data: any[] }`
   - Actions: `fetchTopNews()`, `setFetching()`, `setFetched(error?, data?)`
   - Inline async logic (no thunk needed)

3. **Create `src/services/store/newsCountrySourceStore.ts`**
   - Replace `newsCountrySourceReducer` + `setCountryNewsSource` thunk
   - State: `{ data: string, longName: string }`
   - Actions: `setCountry(country: string)`
   - Handles `sessionStorage` write + longName mapping

4. **Create `src/services/store/index.ts`** - barrel export

### Phase 2: Update components

5. **Update `TopNewsPage.tsx`**
   - Replace `useSelector` calls with `useNewsPreviewStore` / `useNewsCountrySourceStore`
   - Replace `useDispatch(fetchTopNews())` with `useNewsPreviewStore(state => state.fetchTopNews)()`
   - Remove `react-redux` imports

6. **Update `Header/header.tsx`**
   - Replace `useDispatch(setCountryNewsSource())` with `useNewsCountrySourceStore(state => state.setCountry)()`
   - Remove `react-redux` imports

7. **Update `src/main.tsx`**
   - Remove `<Provider store={store}>` wrapper
   - Remove `configureStore` import
   - Zustand requires no provider

8. **Delete Redux files**
   - `src/configureStore.ts`
   - `src/services/reducers/` (entire directory)
   - `src/services/actions/` (entire directory)

### Phase 3: Update tests

9. **Update `TopNewsPage.test.tsx`**
   - Remove `Provider` wrapper and mock store
   - Reset Zustand store state in `beforeEach` using `store.setState(initialState)`
   - Tests remain the same (component behavior unchanged)

10. **Update `Header/header.test.tsx`**
    - Remove `Provider` wrapper and mock store
    - Reset Zustand store in `beforeEach`

11. **Replace reducer/action tests with store tests**
    - `newsPreviewReducer.test.ts` → `newsPreviewStore.test.ts`
    - `newsCountrySourceReducer.test.ts` → `newsCountrySourceStore.test.ts`
    - `newsActions.test.ts` → merged into store tests (async logic is now inline)

### Phase 4: Cleanup

12. **Remove Redux dependencies from `package.json`**
    - `redux`, `redux-thunk`, `react-redux`
    - `@types/redux-devtools-extension`

13. **Update `package.json` keywords** - replace `"redux"` with `"zustand"`

14. **Run tests and fix any issues**
    ```
    npm run test:coverage
    npm run lint
    npm run build
    ```

---

## Zustand Store Signatures (Draft)

### `newsPreviewStore`
```ts
interface NewsPreviewState {
  fetching: boolean;
  fetched: boolean;
  error: string | null;
  data: any[];
  fetchTopNews: () => Promise<void>;
}
```

### `newsCountrySourceStore`
```ts
interface NewsCountrySourceState {
  data: string;
  longName: string;
  setCountry: (country: string) => void;
}
```

---

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Test breakage | Medium | Run tests after each phase |
| Async behavior change | Low | Zustand handles async natively |
| Tree-shaking / bundle size | Low | Zustand is smaller than Redux ecosystem |
| TypeScript types | Low | Zustand is TS-first |

## Estimated Effort
- **Phase 1**: 30 min
- **Phase 2**: 20 min
- **Phase 3**: 30 min
- **Phase 4**: 10 min
- **Total**: ~1.5 hours
