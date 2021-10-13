// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq4WMG0t9ekusoKk8bv95wCkomnqSPmB4",
  authDomain: "eventhub-eaa60.firebaseapp.com",
  projectId: "eventhub-eaa60",
  storageBucket: "eventhub-eaa60.appspot.com",
  messagingSenderId: "45570227930",
  appId: "1:45570227930:web:22eed68ebf68a3ae0eefe3"
};


// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;