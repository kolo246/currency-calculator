# Research: PLN Currency Support

## 1. Formatting (zł symbol)
- **Decision**: Continue using `en-US` locale for `Intl.NumberFormat` but verify if it displays "PLN" or "zł". If "zł" is required as a symbol, `en-US` typically formats it as `PLN 1.00`. To get `1.00 zł`, we may need to specify the locale or use a custom symbol mapping.
- **Rationale**: The project currently uses `en-US` for all formatting to maintain consistency.
- **Alternatives**: Change `formatCurrency` to use the user's browser locale or a currency-specific locale.

## 2. Currency Lists
- **Decision**: Update `DEFAULT_CURRENCIES` in `src/components/CurrencyCalculator/CurrencyCalculator.tsx`.
- **Rationale**: This is the single source of truth for the default dropdown options.

## 3. Mock Data
- **Decision**: Add `PLN: 4.01` to `MOCK_RATES` in `src/services/mockDataService.ts`.
- **Rationale**: This follows the established pattern for mock data and provides a realistic (approximate) rate for testing.
