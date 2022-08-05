// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIx2FoprMImz-yLbdOd2jkHiuoNJtT8m4",
    authDomain: "react-curso-a1883.firebaseapp.com",
    projectId: "react-curso-a1883",
    storageBucket: "react-curso-a1883.appspot.com",
    messagingSenderId: "284106335397",
    appId: "1:284106335397:web:e85f5834197651bae2594c",
    measurementId: "G-BBKWY0R81N"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// autentificar 
export const FirebaseAuth = getAuth(FirebaseApp);
// base de datos
export const FirebaseDB = getFirestore(FirebaseApp)
const analytics = getAnalytics(FirebaseApp);