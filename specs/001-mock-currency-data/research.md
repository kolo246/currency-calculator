# Research: Mock Currency Data Implementation

## 1. Precedence Logic
- **Decision**: `VITE_USE_MOCK_DATA=true` takes absolute precedence. If it is `false` or undefined, the service will check for `VITE_EXCHANGE_RATE_API_KEY`. If the key is missing or is the placeholder value (`YOUR_API_KEY`), the app will fall back to mock mode.
- **Rationale**: This allows developers to force mock mode even if they have a key locally, and ensures the app works "out of the box" for new clones.
- **Alternatives**: Always requiring an explicit flag. Rejected as it complicates initial onboarding.

## 2. Bundle Exclusion (Production Safety)
- **Decision**: Use a dynamic import for `mockDataService` wrapped in a conditional that Vite can statically analyze.
- **Implementation**:
  ```typescript
  if (isMockMode()) {
    const { getMockRates } = await import('./mockDataService');
    return getMockRates(baseCurrency);
  }
  ```
- **Rationale**: Vite will move the `mockDataService` into a separate chunk. If the code path is never reached in production (due to the condition), the chunk might not be loaded, but more importantly, it isolates the mock logic from the main bundle.
- **Alternatives**: MSW (Mock Service Worker). Rejected as overkill for this simple static data requirement.

## 3. Mock Scope (Currencies)
- **Decision**: Support the `DEFAULT_CURRENCIES` defined in `CurrencyCalculator.tsx`: `['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD']`.
- **Rationale**: These are the primary currencies displayed when the API fails or is not yet loaded, so the mock data should align with them to provide a consistent "offline" experience.

## 4. Cache Interaction
- **Decision**: `fetchExchangeRates` will return an additional property `isMock: true`. The `useCurrencyConverter` hook will be updated to *skip* calling `setCachedRates` if `isMock` is true.
- **Rationale**: Prevents mock data from polluting the `localStorage` cache, which should only store authoritative data from the real API.
- **Alternatives**: Cache mock data with a special prefix (e.g., `mock_`). Rejected as unnecessary complexity.
