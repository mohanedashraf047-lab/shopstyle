// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPwJxEz4gd4Xdvn1Pi24SG68MaWFtWgJg",
  authDomain: "shopstyle-27f98.firebaseapp.com",
  projectId: "shopstyle-27f98",
  storageBucket: "shopstyle-27f98.firebasestorage.app",
  messagingSenderId: "684129704885",
  appId: "1:684129704885:web:faa39d42493dd9ea5397fc",
  measurementId: "G-5PXGTWBBG4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app); 

export { auth };
export default app;
