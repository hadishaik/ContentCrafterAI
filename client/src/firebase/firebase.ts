// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCnbA2Ru89jkTcdi1AKbaR8qp-n7JPOPk",
  authDomain: "contentcrafter-26015.firebaseapp.com",
  projectId: "contentcrafter-26015",
  storageBucket: "contentcrafter-26015.firebasestorage.app",
  messagingSenderId: "99815049329",
  appId: "1:99815049329:web:e29fcff6cc5cd41ee633d0",
  measurementId: "G-B3RBQT41C6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
