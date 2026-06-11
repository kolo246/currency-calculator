# Quickstart: Validating Mock Currency Data

This guide provides scenarios to verify that the mock data system is functioning correctly.

## Prerequisites
- Node.js installed.
- Project dependencies installed (`npm install`).

## Scenario 1: Force Mock Mode
**Goal**: Verify the app uses mock data even if an API key is present.

1. Create/Update `.env`:
   ```env
   VITE_USE_MOCK_DATA=true
   VITE_EXCHANGE_RATE_API_KEY=any_key
   ```
2. Start the app: `npm run dev`
3. Open the browser and check the network tab.
4. **Expected**: No network calls to `exchangerate-api.com`. Console should show `[ExchangeRateService] Using mock data`.

## Scenario 2: Default "Out-of-the-Box" Mode
**Goal**: Verify the app works for new developers without configuration.

1. Ensure `.env` is empty or does not contain `VITE_EXCHANGE_RATE_API_KEY`.
2. Start the app: `npm run dev`
3. **Expected**: App functions correctly with conversion results.

## Scenario 3: Cache Bypass Verification
**Goal**: Ensure mock data is not saved to `localStorage`.

1. Enable mock mode (Scenario 1).
2. Perform a conversion.
3. Check `localStorage` in DevTools.
4. **Expected**: No new entries for the base currency in the `rates-cache` key (or equivalent).

## Scenario 4: Bundle Analysis (Advanced)
**Goal**: Verify `mockDataService` is code-split.

1. Run build: `npm run build`
2. Inspect `dist/assets` directory.
3. **Expected**: The mock data and its service logic should be in a separate, asynchronously loaded chunk.
