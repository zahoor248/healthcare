// import firebase from "firebase";

// // var firebase = require("firebase");

// const firebaseConfig = {
//   apiKey: "AIzaSyDospJEhaHyVHh01fiAnzXxtYQRG2FfI0k",
//   authDomain: "hu-app-3a384.firebaseapp.com",
//   projectId: "hu-app-3a384",
//   storageBucket: "hu-app-3a384.appspot.com",
//   messagingSenderId: "761597713390",
//   appId: "1:761597713390:web:5a04609f3c7cf534b0ccff",
// };

// const app = firebase.initializeApp(firebaseConfig);

// export const db = app.firestore();
// // export const messaging = app.messaging();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDospJEhaHyVHh01fiAnzXxtYQRG2FfI0k",
  authDomain: "hu-app-3a384.firebaseapp.com",
  projectId: "hu-app-3a384",
  storageBucket: "hu-app-3a384.appspot.com",
  messagingSenderId: "761597713390",
  appId: "1:761597713390:web:5a04609f3c7cf534b0ccff",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
