import { initializeApp } from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA5SfkM4jVc56E5nJqNVKFeIf4U3wc3EUI",
  authDomain: "mern-ai-40bc4.firebaseapp.com",
  projectId: "mern-ai-40bc4",
  storageBucket: "mern-ai-40bc4.firebasestorage.app",
  messagingSenderId: "595831095740",
  appId: "1:595831095740:web:e39090021cb67140742bb9",
  measurementId: "G-WWWJWSE2L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider};