# Tasks: Currency Calculator

**Input**: Design documents from `/specs/currency-calculator/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by phase and user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create directory structure in `src/` and `tests/` per implementation plan
- [X] T002 Initialize React/TypeScript project with required dependencies (Axios, Lucide React, Vitest)
- [X] T003 [P] Setup design tokens in `src/styles/variables.css` (spacing, colors, typography)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and services

- [X] T004 Define core types in `src/types/index.ts` (ConversionRequest, ExchangeRateAPIResponse)
- [X] T005 [P] Create basic API service in `src/services/exchangeRateService.ts` to fetch rates
- [X] T006 Implement client-side caching logic in `src/utils/cache.ts` (LocalStorage with TTL)
- [X] T007 [P] Create numeric and currency formatters in `src/utils/formatters.ts`

---

## Phase 3: User Story 1 - Instant Currency Conversion (Priority: P1) 🎯 MVP

**Goal**: Basic conversion functionality

**Independent Test**: Verify conversion from USD to EUR with fixed amount

### Tests for User Story 1

- [X] T008 [P] [US1] Unit test for conversion logic in `tests/unit/conversionLogic.test.ts`
- [X] T009 [US1] Integration test for basic conversion flow in `tests/integration/CurrencyCalculator.test.tsx`

### Implementation for User Story 1

- [X] T010 [P] [US1] Create `AmountInput` component in `src/components/CurrencyCalculator/AmountInput.tsx`
- [X] T011 [P] [US1] Create `CurrencyDropdown` component in `src/components/CurrencyCalculator/CurrencyDropdown.tsx`
- [X] T012 [P] [US1] Create `ResultCard` component in `src/components/CurrencyCalculator/ResultCard.tsx`
- [X] T013 [US1] Implement `CurrencyCalculator` main component in `src/components/CurrencyCalculator/CurrencyCalculator.tsx`
- [X] T014 [US1] Hook everything together with basic state management

---

## Phase 4: User Story 2 - Real-time "On-the-fly" Updates (Priority: P2)

**Goal**: Dynamic updates with throttling

### Tests for User Story 2

- [X] T015 [US2] Integration test for debounced input in `tests/integration/CurrencyCalculator.test.tsx`

### Implementation for User Story 2

- [X] T016 [US2] Create custom hook `useCurrencyConverter.ts` in `src/hooks/` to manage state and side effects
- [X] T017 [US2] Implement debounce logic (e.g., `useDebounce`) to throttle API calls/re-calculations
- [X] T018 [US2] Integrate caching service (T006) into the conversion hook

---

## Phase 5: User Story 3 - Robust Error Handling (Priority: P3)

**Goal**: Graceful degradation and user feedback

### Tests for User Story 3

- [X] T019 [US3] Unit test for caching and offline state in `tests/unit/cache.test.ts`
- [X] T020 [US3] Integration test for API error handling in `tests/integration/CurrencyCalculator.test.tsx`

### Implementation for User Story 3

- [X] T021 [US3] Add "loading" and "error" states to `ResultCard` and `CurrencyCalculator`
- [X] T022 [US3] Implement global error handling for API failures (offline, rate limits)
- [X] T023 [US3] Add ARIA labels and accessibility improvements to all components

---

## Phase 6: Polish & Performance

**Purpose**: Final touches and optimization

- [X] T024 [P] Final responsive design audit and CSS tweaks in `src/components/CurrencyCalculator/`
- [X] T025 Performance audit: verify 200ms update goal and bundle size
- [X] T026 [P] Create `quickstart.md` documentation for the feature
- [ ] T027 [US1, US2, US3] Verify 100% path coverage for business logic in `src/services/`, `src/utils/`, and `src/hooks/` using `vitest run --coverage`.
