import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAlS3SgOSZnlej08__L47IN_i5GPiDuRK4',
  authDomain: 'food-pan-94155.firebaseapp.com',
  projectId: 'food-pan-94155',
  storageBucket: 'food-pan-94155.firebasestorage.app',
  messagingSenderId: '941431420769',
  appId: '1:941431420769:web:0f6b81aa86781388613720',
  measurementId: 'G-P19V85561D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
