# Quickstart: Currency Calculator

This tool allows for instant currency conversion with real-time exchange rates.

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Run Tests**:
    ```bash
    npm test
    ```

## Features

- **On-the-fly updates**: Conversion results update as you type.
- **Throttling**: Debounced inputs to reduce API spam.
- **Caching**: 5-minute LocalStorage cache for exchange rates.
- **Responsive**: Mobile-first design.
- **Accessible**: ARIA labels and live regions for screen readers.

## Configuration

- **API Source**: Currently using `ExchangeRate-API`.
- **Cache TTL**: 5 minutes (configurable in `src/utils/cache.ts`).
- **Debounce Delay**: 300ms (configurable in `src/hooks/useCurrencyConverter.ts`).
