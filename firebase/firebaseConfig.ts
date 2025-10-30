// app/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence, // persists across refresh/restart
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlS3SgOSZnlej08__L47IN_i5GPiDuRK4",
  authDomain: "food-pan-94155.firebaseapp.com",
  projectId: "food-pan-94155",
  storageBucket: "food-pan-94155.firebasestorage.app",
  messagingSenderId: "941431420769",
  appId: "1:941431420769:web:0f6b81aa86781388613720"
};

// 1. Single Firebase app
const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

// 2. Create auth instance
const auth = getAuth(app);

// 3. Set persistence synchronously at module load
// We'll wrap this in a Promise so callers can wait for it.
const persistenceReady = (async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[auth] persistence set to browserLocalPersistence");
  } catch (err) {
    console.warn("[auth] failed to set persistence, fallback session only:", err);
  }
})();

export { app, auth, persistenceReady };