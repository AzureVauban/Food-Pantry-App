# ISSUE-19-Configure-Linting

**Issue Type:** Enhancement

## Objective:

<!--What are the criteria for completion?-->

- ESLint is installed and configured using the built-in Expo setup.
- Linting can be executed locally with `npx expo lint` and `npx expo lint --fix`.
- Scripts for linting and auto-fixing are added to `package.json`.
- Prettier is integrated to handle formatting and avoid conflicts with ESLint.
- A CI job and/or pre-commit hook is configured to ensure linting and formatting checks run automatically.

## Description:

<!--What is on this branch-->

This branch integrates code linting and formatting into the project. It leverages Expo’s built-in ESLint configuration for identifying and fixing common issues and adds Prettier for code formatting consistency across JavaScript, TypeScript, JSON, Markdown, and YAML files. Scripts are added to `package.json` for convenience, and optional integrations such as Husky with lint-staged and GitHub Actions workflows are prepared to enforce linting and formatting during development and CI.

## Learnings:

<!--What new knowledge was gained while working on this objective?-->

- Expo ships with ESLint (`expo lint`) so you don’t need a separate CLI.
- `npx expo lint --fix` only applies ESLint autofixes, not Prettier formatting.
- Prettier is the formatter that covers YAML, JSON, Markdown, etc.
- CI failed because Prettier was checking `.yml` and flagged unformatted workflow files.
- Convention: Prettier should format YAML workflows too (standard practice).
- Typical exclusions for Prettier: generated files, build outputs, and vendor code.

## What's next:

<!--After the completion of this objective, where should the focus be next?-->

- Figure out Authentication Services
- Create Low-Fidelity Mockups
- Determine Architecture
- Determine what APIs and external services will be needed

## Miscellaneous Notes:

<!--Any other notes or observations?-->

Tried to implement auto-formatting for staged files during the committing process but could not find a undeprecated verison. I used Husky to do this.
