# Tasks: Mock Currency Data

**Input**: Design documents from `/specs/001-mock-currency-data/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-response.md

**Tests**: Tests are requested as "Independent Test" sections in the specification. These will be implemented using Vitest.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create `src/services/mockDataService.ts` as an empty module for dynamic imports
- [x] T002 [P] Update `.env.example` to include `VITE_USE_MOCK_DATA=false`
- [x] T003 [P] Add unit test file `tests/unit/mockDataService.test.ts` for mock data generation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and type updates needed for all stories

- [x] T004 [P] Update `ExchangeRateAPIResponse` interface in `src/types/index.ts` to include optional `isMock: boolean`
- [x] T005 [P] Implement `isMockMode()` utility in `src/services/exchangeRateService.ts` (Logic: `VITE_USE_MOCK_DATA === 'true' || !API_KEY || API_KEY === 'YOUR_API_KEY'`)
- [x] T006 [P] Update `useCurrencyConverter.ts` hook to accept `isMock` from `fetchExchangeRates` response
- [x] T007 [P] Implement cache bypass logic in `src/hooks/useCurrencyConverter.ts` (do not call `setCachedRates` if `isMock` is true)

**Checkpoint**: Foundation ready - type system and service logic prepared for story implementation.

---

## Phase 3: User Story 1 - Local Development without API Key (Priority: P1) 🎯 MVP

**Goal**: Allow app to work out-of-the-box without an API key by returning fixed mock rates.

**Independent Test**: Unset `VITE_EXCHANGE_RATE_API_KEY`, run app, and verify conversion works with fixed values.

### Implementation for User Story 1

- [x] T008 [US1] Implement `getMockRates(baseCurrency: string)` in `src/services/mockDataService.ts` returning static rates for `DEFAULT_CURRENCIES`
- [x] T009 [US1] Update `fetchExchangeRates` in `src/services/exchangeRateService.ts` to dynamically import `mockDataService` when in mock mode
- [x] T010 [US1] Ensure `fetchExchangeRates` returns `isMock: true` and `result: "success"` in mock mode
- [x] T011 [P] [US1] Add unit test in `tests/unit/mockDataService.test.ts` verifying `getMockRates` returns correct structure and values
- [x] T012 [US1] Add integration test in `tests/integration/CurrencyCalculator.test.tsx` verifying UI renders results without an API key

**Checkpoint**: User Story 1 functional - developers can now clone and run the app without configuration.

---

## Phase 4: User Story 2 - Offline Development Mode (Priority: P2)

**Goal**: Force mock mode via environment variable for offline work.

**Independent Test**: Set `VITE_USE_MOCK_DATA=true`, disable network, and verify conversion results still populate.

### Implementation for User Story 2

- [x] T013 [US2] Update `isMockMode` in `src/services/exchangeRateService.ts` to prioritize `VITE_USE_MOCK_DATA` over API key presence
- [x] T014 [US2] Add E2E-style test case in `tests/integration/CurrencyCalculator.test.tsx` to simulate offline mode with `VITE_USE_MOCK_DATA=true`
- [x] T015 [US2] Verify that no network requests are made to `exchangerate-api.com` when mock mode is active (Mock Axios/Network)

**Checkpoint**: User Story 2 functional - offline development is now officially supported.

---

## Phase 5: User Story 3 - Testing Edge Cases with Custom Mock Data (Priority: P3)

**Goal**: Allow easy modification of mock values to test specific UI states (high/low rates).

**Independent Test**: Modify `mockDataService.ts` values and verify UI reflects changes.

### Implementation for User Story 3

- [x] T016 [US3] Refactor `src/services/mockDataService.ts` to use a configurable object for rates to allow easy editing
- [x] T017 [US3] Add "extreme value" mock scenario (e.g., 1 USD = 0.000001 BTC) to `mockDataService.ts` for manual UI testing
- [x] T018 [P] [US3] Add unit test in `tests/unit/conversionLogic.test.ts` verifying that extreme mock rates don't break formatting/UI logic

**Checkpoint**: User Story 3 functional - QA and Developers can test UI robustness with custom rates.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T019 [P] Update `GEMINI.md` to document the new environment variables and mock mode behavior
- [x] T020 [US1] Implement "Mock Mode" visual badge in `src/components/CurrencyCalculator/ResultCard.tsx` (FR-007)
- [x] T021 Run `npm run build` and verify `mockDataService` is in a separate chunk (Code Splitting check)
- [x] T022 Run `quickstart.md` validation scenarios 1-4
- [x] T023 [P] Final linting and type checking across all modified files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001-T003.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (Phase 3) is the priority MVP.
  - US2 and US3 can proceed once US1 core is implemented.

### Parallel Opportunities

- T001, T002, T003 (Setup)
- T004, T005, T006, T007 (Foundational)
- Once Phase 2 is done, US1 development (T008-T012) can start.
- T019 and T022 (Polish)

---

## Parallel Example: User Story 1

```bash
# Implement mock data and logic concurrently:
Task: "Implement getMockRates in src/services/mockDataService.ts"
Task: "Add unit test in tests/unit/mockDataService.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement US1 (Phase 3).
3. **VALIDATE**: Run Scenario 2 from `quickstart.md`.

### Incremental Delivery

1. Foundation -> Core logic ready.
2. US1 -> Onboarding unlocked (MVP).
3. US2 -> Offline mode unlocked.
4. US3 -> Advanced UI testing unlocked.
