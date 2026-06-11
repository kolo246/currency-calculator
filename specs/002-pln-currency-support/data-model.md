# Data Model: PLN Currency Support

## Entities

### MockDataStore (Updated)
The static rate map in `mockDataService.ts`.
- **Added Field**: `PLN: number` (value: 4.01)

### CurrencyList (Updated)
The hardcoded list of currencies in `CurrencyCalculator.tsx`.
- **Added Entry**: `"PLN"`

## Validation Rules
- PLN rates in mock data must be positive.
- PLN must be selectable in both "From" and "To" fields.
