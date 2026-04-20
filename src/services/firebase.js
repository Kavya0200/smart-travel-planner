// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDrJOZ489C6jUqXy-MnAtcty-Lq0Mr96To",
//   authDomain: "smart-travel-planner-7fc35.firebaseapp.com",
//   projectId: "smart-travel-planner-7fc35",
//   storageBucket: "smart-travel-planner-7fc35.firebasestorage.app",
//   messagingSenderId: "42705037348",
//   appId: "1:42705037348:web:1d649490848bb2ab1010b1",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrJOZ489C6jUqXy-MnAtcty-Lq0Mr96To",
  authDomain: "smart-travel-planner-7fc35.firebaseapp.com",
  projectId: "smart-travel-planner-7fc35",
  storageBucket: "smart-travel-planner-7fc35.firebasestorage.app",
  messagingSenderId: "42705037348",
  appId: "1:42705037348:web:1d649490848bb2ab1010b1",
};

const app = initializeApp(firebaseConfig);

// Ikkada individual ga export chestunnam
export const auth = getAuth(app);
export const db = getFirestore(app);

// default export auth ni pedithe chala files ki easy ga untundi
export default auth;