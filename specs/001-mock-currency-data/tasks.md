# Tasks: Mock Currency Data

**Input**: Design documents from `/specs/001-mock-currency-data/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create mock data service in `src/services/mockDataService.ts`
- [x] T002 [P] Define environment variable types in `src/vite-env.d.ts` (if applicable) or document them in `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Implement `getMockRates` function in `src/services/mockDataService.ts` based on `data-model.md`
- [x] T004 Implement logic to detect when to use mock data in `src/services/exchangeRateService.ts` (detect missing API key or `VITE_USE_MOCK_DATA=true`)
- [x] T005 Update `fetchExchangeRates` in `src/services/exchangeRateService.ts` to return mock data when in mock mode

---

## Phase 3: User Story 1 - Local Development without API Key (Priority: P1) 🎯 MVP

**Goal**: App works immediately after clone without an API key

**Independent Test**: Remove `VITE_EXCHANGE_RATE_API_KEY`, run `npm run dev`, and verify conversion works.

### Implementation for User Story 1

- [ ] T006 [US1] Add console logging in `src/services/exchangeRateService.ts` to notify user when mock data is active
- [ ] T007 [US1] Ensure the mock response in `src/services/mockDataService.ts` matches `ExchangeRateAPIResponse` type exactly
- [ ] T008 [US1] Verify that the UI (e.g., `src/components/CurrencyCalculator/CurrencyCalculator.tsx`) correctly displays conversion results using mock data

---

## Phase 4: User Story 2 - Offline Development Mode (Priority: P2)

**Goal**: App works without internet connection when mock mode is forced

**Independent Test**: Set `VITE_USE_MOCK_DATA=true`, disconnect internet, and verify app functionality.

### Implementation for User Story 2

- [ ] T009 [US2] Update environment variable handling to respect `VITE_USE_MOCK_DATA=true` explicitly in `src/services/exchangeRateService.ts`
- [ ] T010 [US2] Ensure `fetchExchangeRates` skips the axios call entirely when in mock mode in `src/services/exchangeRateService.ts`

---

## Phase 5: User Story 3 - Testing Edge Cases with Custom Mock Data (Priority: P3)

**Goal**: Developers can easily modify mock values for testing

**Independent Test**: Change a rate in `src/services/mockDataService.ts` and see it reflected in the UI.

### Implementation for User Story 3

- [ ] T011 [US3] Structure the mock data in `src/services/mockDataService.ts` for easy modification (e.g., a simple exportable object)
- [ ] T012 [US3] Document how to modify mock rates in `specs/001-mock-currency-data/quickstart.md` or a README

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and production safety

- [ ] T013 [P] Add unit tests for mock detection logic in `tests/unit/mockDetection.test.ts` (if tests were implicitly requested by Constitution Principle II)
- [ ] T014 Ensure `VITE_USE_MOCK_DATA` is NOT set to `true` in any production environment or build script
- [ ] T015 Run full validation following `specs/001-mock-currency-data/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. Blocks US1 and US2.
- **User Stories (Phases 3-5)**: Depend on Foundational. Can proceed in parallel after T005.
- **Polish (Phase 6)**: Final phase after story implementation.

### Parallel Opportunities

- T001 and T002 can be done in parallel.
- Once Phase 2 is done, US1 (T006-T008) and US2 (T009-T010) can potentially be worked on in parallel, though they both touch `exchangeRateService.ts`. Sequential is safer for same-file edits.
- T013 and T014 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup `mockDataService.ts` (T001).
2. Implement mock detection and toggle in `exchangeRateService.ts` (T004, T005).
3. Verify basic conversion works without API key (T008).

### Incremental Delivery

1. Foundation: Mock data ready and service can toggle.
2. US1: Auto-detection (no config needed).
3. US2: Explicit override (forced mock mode).
4. US3: Customization & Documentation.
