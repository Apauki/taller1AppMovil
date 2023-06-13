// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBlp41voDx57dr_-3Hl6816PnYWOkbY0Og",
  authDomain: "appjuegodh.firebaseapp.com",
  projectId: "appjuegodh",
  storageBucket: "appjuegodh.appspot.com",
  messagingSenderId: "469650786162",
  appId: "1:469650786162:web:68a73eadcd8982b9283feb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app)