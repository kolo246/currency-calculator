# Feature Specification: PLN Currency Support

**Feature Branch**: `002-pln-currency-support`

**Created**: 2026-06-11

**Status**: Draft

**Input**: User description: "Extend supported currency with PLN. It should be work with mock data as well."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - PLN Support in Live Mode (Priority: P1)

As a Polish user, I want to see PLN as a supported currency in the calculator so that I can perform conversions to and from my local currency using real market data.

**Why this priority**: Core functionality of the request.

**Independent Test**: Provide a valid API key, select PLN from the "From" or "To" dropdown, and verify that the conversion result is calculated based on real-time rates.

**Acceptance Scenarios**:

1. **Given** the application is in Live Mode, **When** I open the currency dropdowns, **Then** "PLN" should be available in the list.
2. **Given** PLN is selected as the "To" currency, **When** I enter an amount in USD, **Then** the result should correctly display the value in Złoty (zł).

---

### User Story 2 - PLN Support in Mock Mode (Priority: P2)

As a developer, I want PLN to be supported in mock mode so that I can test the UI and logic for Polish currency without needing an active API connection.

**Why this priority**: Ensures feature parity between live and mock environments.

**Independent Test**: Enable Mock Mode, select PLN, and verify that a conversion result is returned using the predefined mock rate.

**Acceptance Scenarios**:

1. **Given** Mock Mode is active, **When** I select PLN, **Then** the system should return a simulated exchange rate without making a network call.
2. **Given** Mock Mode is active, **When** I convert 1 USD to PLN, **Then** the result should reflect the fixed mock rate defined in the system.

## User Scenarios & Testing *(mandatory)*

### Edge Cases

- **Rounding**: Ensure PLN (which typically uses 2 decimal places) is formatted correctly in the result card.
- **Missing Mock Rate**: How does the system handle a conversion if the mock rate for PLN was accidentally omitted but the currency was added to the dropdown? (Fallback to FR-009 from 001-mock-currency-data).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include "PLN" in the default supported currencies list.
- **FR-002**: System MUST include a static exchange rate for PLN in the `MockDataStore` (relative to USD).
- **FR-003**: System MUST correctly format PLN values using the Polish Złoty symbol (zł) and standard decimal notation.
- **FR-004**: System MUST ensure "PLN" is available for selection in both "From" and "To" currency dropdowns.

### Key Entities *(include if feature involves data)*

- **MockDataStore**: Updated to include PLN conversion rates.
- **CurrencyList**: Updated to include PLN as a default option.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can select "PLN" from the dropdown in under 2 seconds.
- **SC-002**: Conversions involving PLN in Mock Mode return a result in under 50ms.
- **SC-003**: 100% of PLN conversion results are formatted with the "zł" symbol or "PLN" code as per project standards.

## Assumptions

- **Mock Rate**: A fixed rate of 1 USD = 4.00 PLN will be used for mock data (subject to implementation detail).
- **API Support**: The external `ExchangeRate-API` supports PLN (which is a standard global currency).
- **UI Space**: The UI can accommodate the 3-letter "PLN" code and the "zł" symbol without layout breaking.
