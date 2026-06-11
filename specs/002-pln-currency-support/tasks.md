# Tasks: PLN Currency Support

**Input**: Design documents from `/specs/002-pln-currency-support/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests are requested in the "Independent Test" sections of the spec. I will add Vitest tasks to cover these.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initializing the feature environment

- [x] T001 [P] Ensure `VITE_USE_MOCK_DATA` and `VITE_EXCHANGE_RATE_API_KEY` are documented in `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core changes required before user stories can be fully tested

- [x] T002 [P] Update `DEFAULT_CURRENCIES` in `src/components/CurrencyCalculator/CurrencyCalculator.tsx` to include "PLN"
- [x] T003 [P] Add "PLN" rate (4.01) to `MOCK_RATES` in `src/services/mockDataService.ts`

**Checkpoint**: PLN is now available in the UI and supported by the mock service.

---

## Phase 3: User Story 1 - PLN Support in Live Mode (Priority: P1) 🎯 MVP

**Goal**: Enable PLN selection and conversion using live API data

**Independent Test**: Use a valid API key, select PLN, and verify real-time conversion.

### Implementation for User Story 1

- [ ] T004 [US1] Verify localized formatting for PLN in `src/utils/formatters.ts` (Ensure "zł" symbol is used or decide on "PLN" code)
- [ ] T005 [P] [US1] Add integration test in `tests/integration/PLNSupport.test.tsx` to verify PLN selection in Live Mode

---

## Phase 4: User Story 2 - PLN Support in Mock Mode (Priority: P2)

**Goal**: Ensure PLN conversions work correctly in offline/mock mode

**Independent Test**: Enable Mock Mode and verify 1 USD to PLN results in ~4.01.

### Implementation for User Story 2

- [ ] T006 [P] [US2] Update `tests/unit/mockDataService.test.ts` to include a case for PLN rate calculation
- [ ] T007 [US2] Add integration test in `tests/integration/PLNSupport.test.tsx` to verify PLN conversion in Mock Mode

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Finalizing documentation and validation

- [ ] T008 [P] Update `GEMINI.md` with notes on PLN support
- [ ] T009 Run `quickstart.md` validation scenarios 1-3
- [ ] T010 [P] Final linting and type checking (`npm run lint` and `tsc`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001 completion.
- **User Stories (Phase 3+)**: Depend on Foundational (Phase 2) completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- T002 and T003 can be done in parallel.
- T005, T006, and T008 can be done in parallel once their respective phases start.

---

## Parallel Example: Foundational Phase

```bash
# Update component and service in parallel
Task: "Update DEFAULT_CURRENCIES in src/components/CurrencyCalculator/CurrencyCalculator.tsx"
Task: "Add PLN rate to MOCK_RATES in src/services/mockDataService.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational tasks.
2. Implement US1 formatting verification and basic integration test.
3. PLN is now "live" for users with API keys.

### Incremental Delivery

1. Foundation ready -> PLN appears in dropdowns.
2. US1 complete -> Live conversions work.
3. US2 complete -> Offline support verified.
4. Polish -> Documentation and final checks.
