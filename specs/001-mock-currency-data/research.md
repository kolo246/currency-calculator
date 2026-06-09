# Research: Mock Currency Data Implementation

## Summary
The goal is to provide a seamless developer experience by allowing the application to function without an external API key or network connection.

## Decisions

### 1. Implementation Strategy: Service-Layer Mocking
- **Decision**: Use a conditional check within the service layer to return mock data.
- **Rationale**: 
    - **Simplicity**: No additional libraries like MSW are required.
    - **Visibility**: It's clear to developers where the data is coming from.
    - **Control**: Easy to trigger based on both explicit flags (`VITE_USE_MOCK_DATA`) and implicit state (missing API key).
- **Alternatives Considered**: 
    - **MSW (Mock Service Worker)**: Great for integration tests and complex apps, but adds overhead and complexity for this specific project.
    - **Vite Proxy**: Can mock endpoints but is harder to configure for "missing API key" runtime logic.

### 2. Mock Data Source
- **Decision**: Create a dedicated `src/services/mockData.ts` file containing the static response structure.
- **Rationale**: Keeps `exchangeRateService.ts` clean and allows for easy updates to the mock rates.

### 3. Trigger Logic
- **Decision**: Mock mode will activate if:
    1. `import.meta.env.VITE_USE_MOCK_DATA === 'true'`
    2. `VITE_EXCHANGE_RATE_API_KEY` is not provided or is set to default placeholder.
- **Rationale**: Covers both intentional mocking and "first run" scenarios.

## Unknowns Resolved
- **Data Structure**: Confirmed `ExchangeRateAPIResponse` in `src/types/index.ts`. Mock data must include all mandatory fields (`result`, `base_code`, `conversion_rates`, etc.).
- **Environment Variables**: Confirmed Vite uses `import.meta.env`.
