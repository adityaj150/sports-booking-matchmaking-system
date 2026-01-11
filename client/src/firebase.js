import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-SOeY56kWq5SXzOGMOCW90DeD6lU3Tns",
  authDomain: "sportshub-a53d1.firebaseapp.com",
  projectId: "sportshub-a53d1",
  storageBucket: "sportshub-a53d1.firebasestorage.app",
  messagingSenderId: "564636682502",
  appId: "1:564636682502:web:fb508600adaf0b43573687",
  measurementId: "G-6DF605JPCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);