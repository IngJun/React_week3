// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "sparta-react-advanced-e25c7.firebaseapp.com",
    projectId: "sparta-react-advanced-e25c7",
    storageBucket: "sparta-react-advanced-e25c7.appspot.com",
    messagingSenderId: "199766521789",
    appId: "1:199766521789:web:256b37c1addbf9c04284d4",
    measurementId: "G-CTW2EPRCRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);