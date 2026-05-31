import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_3Nqjko6mke3If61nRZRZcSh87QYUkX8",
  authDomain: "naguib-1b979.firebaseapp.com",
  projectId: "naguib-1b979",
  storageBucket: "naguib-1b979.firebasestorage.app",
  messagingSenderId: "52211946426",
  appId: "1:52211946426:web:048ebab038e5dc675cc383"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);