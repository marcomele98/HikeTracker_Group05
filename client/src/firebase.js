/*
URL for online user db for verification: https://console.firebase.google.com/project/hike-tracker-811ad/authentication/users

BEWARE: IT IS VERY IMPORTANT THAT, WHEN YOU TEST THE APPLICATION, THE TWO DBs ARE SYNCHRONIZED
*/

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlcCEOfWkyeV8TTNKouHsbijVl6IKcb54",
    authDomain: "hike-tracker-811ad.firebaseapp.com",
    projectId: "hike-tracker-811ad",
    storageBucket: "hike-tracker-811ad.appspot.com",
    messagingSenderId: "25539072974",
    appId: "1:25539072974:web:ab0e1eac9168ddef04919f",
    measurementId: "G-TJ6WH3TSC6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, sendEmailVerification, signOut };