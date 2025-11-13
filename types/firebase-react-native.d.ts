// types/firebase-react-native.d.ts

declare module 'firebase/auth/react-native' {
  import {
    initializeAuth,
    browserLocalPersistence,
    browserSessionPersistence,
    browserPopupRedirectResolver,
  } from 'firebase/auth';

  // explicitly export the missing member
  export function getReactNativePersistence(storage: any): any;

  export {
    initializeAuth,
    browserLocalPersistence,
    browserSessionPersistence,
    browserPopupRedirectResolver,
  };
}
