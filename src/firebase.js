import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABYFiOkNXiYeoc1R4TEAc-SCTv8KYPK2U",
  authDomain: "namp-music-app.firebaseapp.com",
  projectId: "namp-music-app",
  storageBucket: "namp-music-app.firebasestorage.app",
  messagingSenderId: "785652941201",
  appId: "1:785652941201:web:9542d878401e2004029a30",
  measurementId: "G-3X1QFYCD2Z"
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);