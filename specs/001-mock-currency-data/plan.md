# Implementation Plan: Mock Currency Data

**Branch**: `001-mock-currency-data` | **Date**: 2026-06-09 | **Spec**: [specs/001-mock-currency-data/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-mock-currency-data/spec.md`

## Summary
Implement a service-layer mocking mechanism that allows the application to function without an external API key or network connectivity. This will be achieved by intercepting exchange rate requests in `exchangeRateService.ts` and returning predefined static data if certain conditions (environment variables or missing keys) are met.

## Technical Context

**Language/Version**: TypeScript / Vite / React

**Primary Dependencies**: Axios (existing)

**Storage**: LocalStorage (for caching, existing)

**Testing**: Vitest (existing)

**Target Platform**: Web Browser

**Project Type**: Web Application

**Performance Goals**: WCAG 2.1 AA, P95 response < 200ms

**Constraints**: Must be offline-capable when in mock mode; no mock data in production builds.

**Scale/Scope**: Small utility feature; impact limited to service layer.

**CLARIFICATIONS RESOLVED (see research.md)**:
1. **Precedence Logic**: `VITE_USE_MOCK_DATA=true` takes precedence over API key availability.
2. **Bundle Exclusion**: Implementation will use dynamic `import()` to ensure mock data is code-split.
3. **Mock Scope**: Supporting `DEFAULT_CURRENCIES` (USD, EUR, GBP, JPY, etc.).
4. **Cache Interaction**: Mock data will return `isMock: true` and will NOT be stored in `localStorage`.

## Constitution Check

*GATE: PASSED*

- **Principle I: Code Quality**: Uses dynamic imports and explicit service patterns to maintain decoupling.
- **Principle II: Testing**: Quickstart guide defines measurable validation scenarios (Scenario 1-4).
- **Principle III: UX**: Prevents cache pollution and ensures "out of the box" functionality.
- **Principle IV: Performance**: Code-splitting ensures zero bundle size impact on production code paths.

## Project Structure

### Documentation (this feature)

```text
specs/001-mock-currency-data/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── services/
│   ├── exchangeRateService.ts  # Updated to handle mock toggle
│   └── mockDataService.ts      # New: provides static mock data
├── types/
│   └── index.ts                # Existing types
```

**Structure Decision**: Minimalist addition to the existing service layer.

## Complexity Tracking

*No violations identified.*
