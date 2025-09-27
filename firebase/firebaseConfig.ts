// app/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAlS3SgOSZnlej08__L47IN_i5GPiDuRK4',
  authDomain: 'food-pan-94155.firebaseapp.com',
  projectId: 'food-pan-94155',
  storageBucket: 'food-pan-94155.firebasestorage.app',
  messagingSenderId: '941431420769',
  appId: '1:941431420769:web:0f6b81aa86781388613720',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
