// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTUX8tYDKScIrYA4hr2FUQRi5CcvZNmgg",
  authDomain: "lasalle-cbb.firebaseapp.com",
  projectId: "lasalle-cbb",
  storageBucket: "lasalle-cbb.appspot.com",
  messagingSenderId: "12979841531",
  appId: "1:12979841531:web:f3b88aa7224a485f04035e",
  measurementId: "G-GQBERHK5DQ"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export { firebaseConfig, appFirebase };