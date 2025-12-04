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

### Why iOS Development Is Not Practically Possible for This Project

- The iOS build process **requires full native setup** (Xcode, CocoaPods, certificates), which contradicts Expo’s core simplicity.
- **Hermes engine scripts and podspec configurations** break under npm-only workflows and demand manual patching in auto-generated Pod files.
- Each teammate would need **identical macOS, Xcode, and Node environments** — a fragile and unrealistic requirement.
- **Expo Dev Client** negates the benefit of Expo Go by forcing native builds before testing can even occur.
- **Firebase Auth and related native dependencies** introduce link errors, breaking the managed workflow completely.
- **Xcode build logs are cryptic and unrewarding**, requiring deep knowledge of Apple’s build system for even basic debugging.
- **Dependency mismatches** (Hermes versions, React Native versions, Podfile targets) create cascading failures across Pods.
- Apple’s **code signing and provisioning** barriers make testing on other devices nearly impossible without paid developer accounts.
- The **bare workflow dependency chain** (Node → React Native → Pods → Xcode → Hermes) multiplies the points of failure exponentially.
- Maintaining iOS compatibility **defeats Expo’s cross-platform promise**, making collaborative development infeasible.

**TLDR**: The practical barrier is that iOS builds require native dependencies, Apple-specific tooling, and signing credentials that conflict with our team’s npm-only Expo setup. Every teammate would need a Mac, Xcode, and matching environment to build or test. Debugging requires diving into auto-generated iOS Pod files and Hermes scripts, which defeats the purpose of using Expo for fast, cross-platform development. In short, maintaining an iOS build introduces disproportionate technical overhead with little payoff compared to Android or web, where the app runs natively and consistently without this friction.

## What's next:

## Miscellaneous Notes:

### Why iOS Can Be Done If Switched to Supabase

Using Supabase makes iOS development practical again because it removes all native dependency requirements. Supabase relies entirely on JavaScript libraries, meaning there is no need to link pods or manage Hermes engine versions. This eliminates the need for Xcode configuration and allows the app to run smoothly in Expo Go across all devices. The setup remains consistent for all teammates, avoiding macOS-specific build issues.

Summary:

| Platform         | Practicality | Recommended Action                               |
| :--------------- | :----------- | :----------------------------------------------- |
| iOS (Expo Go)    | ✅ Practical | Switch to Supabase to remove native dependencies |
| iOS (Dev Client) | ⚠️ Optional  | Only needed if using native packages             |
| Android          | ✅ Practical | Continue building normally                       |
| Web              | ✅ Easy      | Works directly with JS SDK                       |
