// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCuAXMsP1s91R1MrSRfHduGOD4C7fD_Ves',
  authDomain: 'animal-zone-v2.firebaseapp.com',
  projectId: 'animal-zone-v2',
  storageBucket: 'animal-zone-v2.appspot.com',
  messagingSenderId: '649105536242',
  appId: '1:649105536242:web:7f9524f15893f0f56d8c6b',
  measurementId: 'G-NTSG6RZSNS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
