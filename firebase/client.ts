
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPgSzgvmUFhdgeKoWQQvb3ePKGs49OfAs",
    authDomain: "prepai-7f4f9.firebaseapp.com",
    projectId: "prepai-7f4f9",
    storageBucket: "prepai-7f4f9.firebasestorage.app",
    messagingSenderId: "632074692517",
    appId: "1:632074692517:web:fc4961e88301c93ee8ea4c",
    measurementId: "G-HRKE0KVC4T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

