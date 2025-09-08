# ISSUE-17-Configure-Jest-Unit-Tests

**Issue Type(s):** Enhancement, Documentation

## Objective:

Set up Jest unit testing in the Expo React Native app so that developers can reliably test both logic (e.g., pantry updates) and components. Ensure tests run without native runtime issues and provide a foundation for future unit tests.

## Description:

This branch configures Jest with `jest-expo`, adds `@testing-library/react-native` and `@testing-library/jest-native`, and sets up `jest.config.js` and `jest.setup.ts`. A dummy math test (`5 + 5 = 10`) and a sample component test were added to validate the setup. Adjustments to mocking (e.g., `NativeAnimatedHelper`) were made to ensure compatibility with the current React Native version.

## Learnings:

- How Jest discovers test files in `__tests__` folders or with `.test.ts[x]` naming.
- Why to mock dependencies like `react-native/Libraries/Animated/NativeAnimatedHelper` to silence irrelevant warnings.
- The role of dependency injection for making functions (e.g., updating pantry items) easier to test.
- Common mocking strategies: module mocks, function mocks, spies, and manual mocks.
- Standard practices for organizing tests in React Native/Expo projects.

## What's next:

- Create Low Fidelity Mockups
- Configure Linting, maybe with ESlint so basic type checking and consistent formatting

## Miscellaneous Notes:

- `react-test-renderer` version must align with the installed `react` version to avoid dependency conflicts.
- Mocking can be used for AsyncStorage, network requests, time, and navigation when writing future pantry-related tests.
