# Feature Specification: Mock Currency Data

**Feature Branch**: `001-mock-currency-data`

**Created**: 2026-06-09

**Status**: Draft

**Input**: User description: "Add logic to handle local run with mock data for each currency. Mock data doesn't have to reflect real market values."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Local Development without API Key (Priority: P1)

As a developer, I want the application to work immediately after cloning without needing to provide an external API key so that I can start developing right away.

**Why this priority**: Crucial for developer experience and easy onboarding.

**Independent Test**: Remove or unset `VITE_EXCHANGE_RATE_API_KEY` from the environment, run the app, and verify that currency conversion still works with fixed values.

**Acceptance Scenarios**:

1. **Given** no API key is provided, **When** the application starts, **Then** it should use a local mock data set instead of failing.
2. **Given** mock data is active, **When** I change the amount or currency, **Then** the result should update based on the mock exchange rates.

---

### User Story 2 - Offline Development Mode (Priority: P2)

As a developer, I want to be able to work on the UI and logic while offline or when the external API is unreachable.

**Why this priority**: Ensures productivity regardless of network conditions or API status.

**Independent Test**: Disable network connection, set `VITE_USE_MOCK_DATA=true`, and verify that the application continues to provide conversion results.

**Acceptance Scenarios**:

1. **Given** `VITE_USE_MOCK_DATA` is set to `true`, **When** the app makes a request for exchange rates, **Then** it should immediately return mock data without attempting an external network call.

---

### User Story 3 - Testing Edge Cases with Custom Mock Data (Priority: P3)

As a developer, I want to easily modify mock values to test specific UI states (e.g., extremely high/low rates, many decimal places).

**Why this priority**: Helps in validating UI robustness.

**Independent Test**: Modify the mock data file and verify that the UI reflects the updated rates.

**Acceptance Scenarios**:

1. **Given** mock data is being used, **When** a specific currency rate is changed in the mock source, **Then** the UI should display the updated conversion result for that currency.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a mechanism to toggle mock data usage. `VITE_USE_MOCK_DATA=true` takes absolute precedence; otherwise, mock mode is activated if `VITE_EXCHANGE_RATE_API_KEY` is missing or set to the placeholder value.
- **FR-002**: System MUST include a static set of exchange rates covering at minimum the `DEFAULT_CURRENCIES` (USD, EUR, GBP, JPY, AUD, CAD, CHK, CNY, HKD, NZD).
- **FR-003**: System MUST return mock data in the same format as the production API response, including an `isMock: true` property.
- **FR-004**: System MUST NOT include mock data or mock service logic in the production bundle. This MUST be enforced via build-time code splitting (e.g., dynamic imports).
- **FR-005**: System MUST log a message to the console when mock data is active.
- **FR-006**: System MUST bypass the `localStorage` cache when mock mode is active to prevent data pollution.
- **FR-007**: System MUST provide a visible indicator in the UI (e.g., a "Mock Mode" badge) when using simulated data to ensure developer awareness. [Gap]
- **FR-008**: Mock service MUST return data in under 50ms to simulate a "local-only" experience. [Measurability]
- **FR-009**: System MUST handle missing currencies in the mock dataset by falling back to a base rate of 1.0 or displaying a clear "Currency Not Supported in Mock" error. [Edge Case]

### Key Entities *(include if feature involves data)*

- **ExchangeRateResponse**: The structure representing the API response, which the mock data must mimic (e.g., containing `base_code` and `conversion_rates`).
- **MockDataStore**: The internal storage (e.g., a static file) containing the predefined mock rates.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new developer can run the application and see a successful currency conversion in under 30 seconds after `npm install` and `npm run dev`, without any configuration.
- **SC-002**: 100% of the UI components that depend on exchange rates function correctly when using mock data.
- **SC-003**: Mock data is never loaded or used when the application is built for production.

## Assumptions

- Mock data is only intended for local development and testing.
- The structure of the mock data will match the `ExchangeRate-API` v6 response format.
- Developers are comfortable using environment variables to override default behavior.
- Real-world market accuracy is not required for these mock values.
