# ISSUE-61-resolve-google-sign-in-authorization-error-in-firebase-authentication

**Issue Type(s):** Bugfix, Enhancement

## Objective:
Ensure Google Sign-In works reliably across iOS and Android by correcting the Firebase OAuth setup and enabling persistent authentication state. This involves fixing the authorization error (`Error 400: invalid_request`) and adding persistent storage support for Firebase Auth.

## Description:
This branch addresses a Google OAuth 2.0 authorization error encountered during Google Sign-In via Firebase Authentication. The issue was traced to a misconfigured OAuth consent screen and incorrect redirect URIs in the Google Cloud Console, which caused sign-in requests to be blocked.  

Additionally, the app displayed a Firebase warning indicating missing AsyncStorage persistence, resulting in non-persistent user sessions between app restarts.  

The fix includes:
- Publishing the OAuth consent screen or adding test users.
- Verifying and updating the redirect URI in Firebase and Google Cloud Console.
- Installing `@react-native-async-storage/async-storage` and integrating it into the Firebase initialization logic.
- Testing Google Sign-In on both iOS and Android to confirm consistent behavior.

## Learnings:


## What's next:


## Miscellaneous Notes:
