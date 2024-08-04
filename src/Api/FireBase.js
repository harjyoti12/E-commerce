// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};