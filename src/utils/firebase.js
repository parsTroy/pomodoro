// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCXwdOfpsqq8C9vsXPRfAgzPIljNJanyF0',
    authDomain: 'pomotodoapp.firebaseapp.com',
    projectId: 'pomotodoapp',
    storageBucket: 'pomotodoapp.appspot.com',
    messagingSenderId: '570550569856',
    appId: '1:570550569856:web:7f156985e3c16678eb4f65',
    measurementId: 'G-1CR35Q5XK1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
