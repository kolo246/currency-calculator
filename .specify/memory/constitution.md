<!--
Sync Impact Report:
- Version change: Initial → 1.0.0 (MAJOR: Initial adoption of core principles)
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Code Quality & Maintainability (NON-NEGOTIABLE)
  - [PRINCIPLE_2_NAME] → II. Testing Excellence
  - [PRINCIPLE_3_NAME] → III. UX Consistency & Accessibility
  - [PRINCIPLE_4_NAME] → IV. Performance First
- Added sections:
  - Quality Gates & Review Process
  - Dependency & Tech Stack Governance
- Removed sections:
  - [PRINCIPLE_5_NAME] (Merged/Removed)
- Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ updated (aligned)
  - .specify/templates/spec-template.md: ✅ updated (aligned)
  - .specify/templates/tasks-template.md: ✅ updated (aligned)
- Follow-up TODOs: None
-->

# Currency Calculator Constitution

## Core Principles

### I. Code Quality & Maintainability (NON-NEGOTIABLE)
Code must be clean, modular, and self-documenting. We follow the "Boy Scout Rule"—always leave the code cleaner than you found it.

**Rules**:
*   MUST adhere to SOLID principles for all architectural decisions.
*   MUST NOT exceed a cyclomatic complexity of 10 for any function.
*   MUST NOT exceed 3 levels of nested control structures.
*   MUST follow language-specific standard style guides (e.g., PEP 8, StandardJS).

**Rationale**: To ensure long-term velocity and ease of onboarding, making the codebase resilient to change.

### II. Testing Excellence
Every feature must be verified through automated testing before being considered complete.

**Rules**:
*   Every feature MUST have automated unit tests covering all success and error paths.
*   Core business logic MUST achieve 100% path coverage.
*   Automated integration tests MUST be provided for all public APIs and core user journeys.
*   Bug fixes MUST include a regression test that fails before the fix is applied.

**Rationale**: To prevent regressions and ensure that features work as intended by users, providing confidence in deployments.

### III. UX Consistency & Accessibility
We provide a predictable, inclusive, and polished experience for all users.

**Rules**:
*   All UI components MUST use the project's standardized design tokens for spacing, typography, and color.
*   Every user-facing action MUST provide immediate feedback (loading, success, or error state).
*   The application MUST comply with WCAG 2.1 AA accessibility standards.
*   Error messages MUST be human-readable and provide actionable steps for resolution.

**Rationale**: To build trust with users and ensure the application is usable by everyone, regardless of ability or context.

### IV. Performance First
Performance is a core feature that directly impacts user satisfaction and system efficiency.

**Rules**:
*   P95 response time for all interactive UI elements MUST be under 200ms.
*   Initial page load/app startup MUST be under 2 seconds on a standard 4G connection.
*   Every change MUST NOT introduce memory leaks or significant CPU spikes.
*   Resource optimization (e.g., bundle size, image compression) is mandatory.

**Rationale**: Performance directly correlates with user retention and operational efficiency.

## Quality Gates & Review Process
We maintain high standards through rigorous automated and manual checks.

**Rules**:
*   No code can be merged without passing all automated quality gates (Lint, Type-check, Tests).
*   Architecture-changing changes MUST be preceded by an approved Design Doc.
*   Code reviews MUST verify compliance with these Core Principles.

**Rationale**: Consistent quality gates ensure that standards are upheld uniformly across the project.

## Dependency & Tech Stack Governance
We manage our technology stack intentionally to minimize risk and debt.

**Rules**:
*   New dependencies MUST be vetted for security, performance impact, and maintenance status.
*   Experimental features MUST be hidden behind feature flags.
*   We favor stable, community-supported technologies over experimental ones.

**Rationale**: Careful management of dependencies prevents security vulnerabilities and technical debt accumulation.

## Governance
This constitution is the supreme governing document for the project's technical and design decisions.

**Rules**:
*   **Amendment Procedure**: Changes to the Constitution require a MAJOR version bump and team-wide approval.
*   **Versioning Policy**: Semantic versioning (MAJOR.MINOR.PATCH) is strictly followed.
*   **Compliance Review**: Monthly reviews ensure the codebase still aligns with these principles.
*   All PRs and reviews must verify compliance with this Constitution.

**Version**: 1.0.0 | **Ratified**: 2026-06-09 | **Last Amended**: 2026-06-09
