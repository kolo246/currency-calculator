# Quickstart: Validating PLN Currency Support

This guide provides scenarios to verify that PLN is correctly supported.

## Scenario 1: PLN in Mock Mode
**Goal**: Verify PLN works without an API key.

1. Set `VITE_USE_MOCK_DATA=true` in `.env`.
2. Start the app: `npm run dev`.
3. **Expected**: "PLN" is available in the dropdown. Selecting USD -> PLN with amount 1 should show approximately 4.01.

## Scenario 2: PLN in Live Mode
**Goal**: Verify PLN works with real API data.

1. Set `VITE_USE_MOCK_DATA=false` and provide a valid `VITE_EXCHANGE_RATE_API_KEY` in `.env`.
2. Start the app.
3. **Expected**: "PLN" is available. Conversion results reflect current market rates from the API.

## Scenario 3: Formatting Check
**Goal**: Verify PLN symbol/formatting.

1. Perform any conversion to PLN.
2. **Expected**: The result is formatted correctly (e.g., `PLN 4.01` or `4.01 zł` depending on locale implementation).
