// firebase/firebaseConfig.ts
import { Platform } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlS3SgOSZnlej08__L47IN_i5GPiDuRK4',
  authDomain: 'food-pan-94155.firebaseapp.com',
  projectId: 'food-pan-94155',
  storageBucket: 'food-pan-94155.firebasestorage.app',
  messagingSenderId: '941431420769',
  appId: '1:941431420769:web:0f6b81aa86781388613720',
};

// 1. Make sure we only ever initialize the Firebase app once
const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

// 2. Auth instance for this app
const auth = getAuth(app);

// 3. Firestore instance for this app
const db = getFirestore(app);

// 4. Configure persistence once per platform and expose a promise so callers can wait
const persistenceReady = (async () => {
  try {
    if (Platform.OS === 'web') {
      await setPersistence(auth, browserLocalPersistence);
      console.log('[auth] web persistence: browserLocalPersistence');
    } else {
      await setPersistence(auth, inMemoryPersistence);
      console.log('[auth] native persistence: inMemoryPersistence');
    }
  } catch (err) {
    console.warn('[auth] failed to set persistence:', err);
  }
})();

export { app, auth, db, persistenceReady };
