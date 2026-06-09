# Data Model: Mock Currency Data

## Entities

### MockExchangeRateResponse
Represents the mocked response from the ExchangeRate-API.

| Field | Type | Description |
|-------|------|-------------|
| result | string | Always "success" |
| documentation | string | Placeholder URL |
| terms_of_use | string | Placeholder URL |
| time_last_update_unix | number | Current timestamp (mocked) |
| time_last_update_utc | string | Current date/time string (mocked) |
| base_code | string | The currency used as base for rates |
| conversion_rates | Record<string, number> | Map of currency codes to their exchange rates |

## Mock Data Set
Initial set of currencies to be supported in mock mode:
- USD: 1.0 (Base)
- EUR: 0.92
- GBP: 0.79
- JPY: 151.5
- AUD: 1.52
- CAD: 1.35

## Validation Rules
1. `conversion_rates` MUST NOT be empty.
2. `base_code` MUST be present in `conversion_rates` (usually with value 1.0).
3. All rates MUST be positive numbers.
