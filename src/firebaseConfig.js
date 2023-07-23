// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9RUJizHg9uurPE9YSJaErAyGfSEPQwyI',
  authDomain: 'animal-zone-45b1c.firebaseapp.com',
  projectId: 'animal-zone-45b1c',
  storageBucket: 'animal-zone-45b1c.appspot.com',
  messagingSenderId: '1076848319466',
  appId: '1:1076848319466:web:847d33eb05ee7cd30db093',
  measurementId: 'G-PGP5HLMH8Q',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
