// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpuVfHdeiOn7yVwJOcyJdqheKoxu5FNnE",
  authDomain: "todos-6438e.firebaseapp.com",
  projectId: "todos-6438e",
  storageBucket: "todos-6438e.appspot.com",
  messagingSenderId: "1041185008563",
  appId: "1:1041185008563:web:3739dcb6103aa801b679c6",
  measurementId: "G-YWE8KR8M5H",
  databaseURL: "https://todos-6438e-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp