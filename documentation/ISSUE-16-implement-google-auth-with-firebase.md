#ISSUE-16-implement-google-auth-with-firebase  
**Issue Type(s):** Bugfix, Enhancement, Feature

## Objective:

Finalize and stabilize Google Authentication using Firebase for the web application, ensuring reliable session persistence, proper logout handling, and unified configuration management.

## Description:

Fixed hook placement issues related to `useRouter` and removed obsolete Firestore imports to streamline the codebase. Consolidated duplicate Firebase configuration files into a single, maintainable source. Corrected logout redirect logic and ensured session persistence on page refresh for a seamless user experience. Applied linting and formatting fixes that improve code maintainability and readability.

## What's next:

Focus on reimplementing mobile authentication once configuration issues on iOS and Android are resolved. Additionally, introduce comprehensive testing targeting multi-session edge cases to enhance authentication reliability across different environments.

## Miscellaneous Notes:

Mobile authentication was deprioritized during this sprint due to ongoing configuration issues across iOS and Android. The focus remained on ensuring full stability of the web authentication flow, which is now verified and functional. Documentation and refactoring efforts have further improved code maintainability and reduced redundant imports.
