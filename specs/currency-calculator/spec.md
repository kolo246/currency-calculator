# Feature Specification: Currency Calculator

**Feature Branch**: `001-currency-calculator`

**Created**: 2026-06-09

**Status**: Draft

**Input**: User description: "Create a lightweight, responsive Currency Calculator tool. The core objective is to allow users to instantly compute the converted cost between two currencies by pulling real-time exchange rates. The application must feature two currency dropdown menus (Source Currency and Target Currency), an input field for the primary asset amount, and a clean, read-only display card showing the dynamically calculated final cost. The conversion engine must rely on a freely available REST API (such as the ExchangeRate-API or Open Exchange Rates free tier). When the user changes the currency selection or alters the input amount, the calculation should compute on-the-fly. The application needs to elegantly handle API offline errors, invalid numeric inputs, and throttle/cache rapid consecutive API requests to conserve rate limits."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant Currency Conversion (Priority: P1)

As a user, I want to convert an amount from one currency to another so that I can quickly see the equivalent value in my target currency.

**Why this priority**: This is the core functionality of the application. Without this, the tool provides no value.

**Independent Test**: Can be tested by selecting USD as source, EUR as target, entering "100", and verifying that a numerical result (e.g., "92.50") is displayed.

**Acceptance Scenarios**:

1. **Given** the application is loaded, **When** I select "USD" as the source and "EUR" as the target and enter "100" in the amount field, **Then** I should see the calculated conversion in the display card.
2. **Given** a successful conversion, **When** I change the source currency to "GBP", **Then** the display card should update on-the-fly with the new conversion value.

---

### User Story 2 - Real-time "On-the-fly" Updates (Priority: P2)

As a user, I want the conversion result to update automatically as I type or change selections so that I don't have to click a manual "convert" button.

**Why this priority**: Enhances the user experience by providing instant feedback, as requested in the requirements.

**Independent Test**: Can be tested by monitoring the display card while typing "10", then "100", and confirming the result updates without page refresh or button clicks.

**Acceptance Scenarios**:

1. **Given** an amount of "10", **When** I type "0" to make it "100", **Then** the display card should update the conversion result immediately (accounting for throttling).
2. **Given** a target currency of "EUR", **When** I select "JPY" from the dropdown, **Then** the display card should immediately show the value in Yen.

---

### User Story 3 - Robust Error Handling & Offline Support (Priority: P3)

As a user, I want to be informed if the conversion cannot be performed (e.g., due to network issues or invalid input) so that I understand why the tool isn't working.

**Why this priority**: Ensures reliability and prevents user confusion during edge cases or external API failures.

**Independent Test**: Can be tested by disabling network connection and attempting a conversion, verifying that an "Offline/Network Error" message is displayed instead of a blank card.

**Acceptance Scenarios**:

1. **Given** the system is offline, **When** I attempt a conversion, **Then** the display card should show a friendly error message like "Service currently unavailable".
2. **Given** I enter an invalid amount (e.g., "abc" or negative number), **When** I trigger a conversion, **Then** the system should display a validation error or clear the result.

### Edge Cases

- **API Rate Limiting**: How does the system handle a 429 (Too Many Requests) from the ExchangeRate API? (Throttling/Caching required).
- **Unsupported Currency**: What happens if the API returns a currency code that isn't in our dropdown or vice versa?
- **Extreme Amounts**: Handling very large numbers (trillions) or very small decimals (satoshi level) without layout break.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide two dropdown menus for currency selection (Source and Target).
- **FR-002**: System MUST provide a numeric input field for the amount to be converted.
- **FR-003**: System MUST fetch real-time exchange rates from a free REST API (ExchangeRate-API or Open Exchange Rates).
- **FR-004**: System MUST update the conversion result dynamically (on-the-fly) when any input changes.
- **FR-005**: System MUST implement throttling (e.g., debounce) and caching (e.g., 5-minute cache) to minimize API calls.
- **FR-006**: System MUST display a clean, read-only card for the final conversion result.
- **FR-007**: System MUST handle API errors (offline, timeouts, invalid keys) gracefully with user feedback.

### Key Entities

- **ConversionRequest**: Represents the user's intent (Source Currency, Target Currency, Amount).
- **ExchangeRate**: Represents the data fetched from the external API (Base Currency, Rates mapping, Timestamp).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Conversion results MUST be displayed within 200ms of input change (after debounce).
- **SC-002**: Application MUST remain functional and responsive on mobile devices (responsive design).
- **SC-003**: API calls for the same currency pair MUST be served from cache if requested within 5 minutes.
- **SC-004**: Validation errors for non-numeric input MUST be shown immediately to the user.

## Assumptions

- **Assumption 1**: Users have access to a modern web browser with JavaScript enabled.
- **Assumption 2**: The free tier of the chosen ExchangeRate API provides sufficient coverage for major global currencies.
- **Assumption 3**: Persistent local storage (e.g., LocalStorage) can be used for simple caching of rates.
