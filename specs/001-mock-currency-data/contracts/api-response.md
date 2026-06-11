# Contract: Exchange Rate API Response

## Interface: `ExchangeRateAPIResponse`

This contract defines the structure returned by the `exchangeRateService`, whether from the real API or the mock service.

```typescript
export interface ExchangeRateAPIResponse {
  result: string;             // "success" or "error"
  base_code: string;          // e.g., "USD"
  conversion_rates: Record<string, number>; // Map of currency codes to rates
  time_last_update_unix: number; // Unix timestamp
  isMock?: boolean;           // OPTIONAL: Flag for mock data (added by this feature)
  'error-type'?: string;      // OPTIONAL: Error details if result is "error"
}
```

## Mock Service Specifics
- `result` will always be `"success"`.
- `isMock` will always be `true`.
- `conversion_rates` will include a fixed set of `DEFAULT_CURRENCIES`.
