# Quickstart Validation: Mock Currency Data

This guide describes how to verify the mock data implementation.

## Setup for Validation

1.  **Option A: No API Key**
    - Ensure `.env` does not contain `VITE_EXCHANGE_RATE_API_KEY` or it is set to `YOUR_API_KEY`.
2.  **Option B: Explicit Mock Mode**
    - Add `VITE_USE_MOCK_DATA=true` to your `.env` file.

## Validation Scenarios

### Scenario 1: Initial Load (No Config)
- **Prerequisites**: Fresh clone, no `.env` file.
- **Action**: Run `npm run dev`.
- **Expected Outcome**:
    - App loads without errors.
    - Console shows "Using mock exchange rates".
    - Default conversion (e.g., USD to EUR) displays a result (e.g., 100 USD = 92 EUR).

### Scenario 2: Offline Resilience
- **Prerequisites**: Enable airplane mode or disconnect internet.
- **Action**: Refresh the application.
- **Expected Outcome**:
    - Application remains functional.
    - Currency dropdowns are populated.
    - Conversions continue to work using mock rates.

### Scenario 3: Production Safety
- **Prerequisites**: Run `npm run build`.
- **Action**: Inspect the bundle or run the production build locally.
- **Expected Outcome**:
    - Mock data logic is either tree-shaken or inactive.
    - The application still attempts to hit the real API in production mode (unless explicitly configured otherwise, though SC-003 mandates no mock data in production).
