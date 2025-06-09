import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUq8OAl_5vi6t7moOsvTobEIA6z3gM0cY",
  authDomain: "vibeify-2b086.firebaseapp.com",
  projectId: "vibeify-2b086",
  storageBucket: "vibeify-2b086.firebasestorage.app",
  messagingSenderId: "69590049859",
  appId: "1:69590049859:web:0541f61ae4ec397e2820f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
