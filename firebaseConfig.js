import { initializeApp } from "firebase/app";
import { getAuth,FacebookAuthProvider,GoogleAuthProvider  } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import{getFireStore}from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCbzCVPbhQ7yATpR28M6KwRP1ikgkvGpcc",
  authDomain: "locationtest-9e14d.firebaseapp.com",
  databaseURL: "https://locationtest-9e14d-default-rtdb.firebaseio.com",
  projectId: "locationtest-9e14d",
  storageBucket: "locationtest-9e14d.appspot.com",
  messagingSenderId: "750246867900",
  appId: "1:750246867900:web:e0feb4200a178b23cbf1b9",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
//export const FIREBASE_GOOLGE_AUTH = getFireStore(FIREBASE_APP);
