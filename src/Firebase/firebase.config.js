// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuCMlL6ovgkvoIRCMr2xs--mXgS05tunY",
  authDomain: "assignment-12-c0f80.firebaseapp.com",
  projectId: "assignment-12-c0f80",
  storageBucket: "assignment-12-c0f80.appspot.com",
  messagingSenderId: "556166838130",
  appId: "1:556166838130:web:929cac7fb993e6eaf34feb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth