# Data Model: Mock Currency Data

## Entities

### MockExchangeRates
Represents the structure of the mock data returned by the `mockDataService`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `base_code` | `string` | The currency code being converted from. |
| `conversion_rates` | `Record<string, number>` | Map of target currency codes to exchange rates. |
| `time_last_update_unix` | `number` | Static timestamp (simulated). |
| `isMock` | `boolean` | Flag indicating this data is simulated. |

## Validation Rules
- `conversion_rates` must include all `DEFAULT_CURRENCIES`.
- Exchange rates must be positive numbers.
- `base_code` must be a valid 3-letter currency code.

## State Transitions
1. **Request**: `fetchExchangeRates(base)` is called.
2. **Evaluate Mode**: System checks `VITE_USE_MOCK_DATA` and `VITE_EXCHANGE_RATE_API_KEY`.
3. **Mock Branch**: If in mock mode, `mockDataService` is dynamically loaded.
4. **Response**: Mock data is returned with `isMock: true`.
5. **UI Update**: `useCurrencyConverter` hook receives data, updates state, and bypasses persistent cache.
