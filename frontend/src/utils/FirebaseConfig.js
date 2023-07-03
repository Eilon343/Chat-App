// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxbJeITBbsHpHzxdWfG8-OZaSf8Y_iCB4",
  authDomain: "chat-app-d28a0.firebaseapp.com",
  projectId: "chat-app-d28a0",
  storageBucket: "chat-app-d28a0.appspot.com",
  messagingSenderId: "335921980679",
  appId: "1:335921980679:web:5fce58de03f8c16b1651a2",
  measurementId: "G-GL62139J86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
