import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// REPLACE THIS OBJECT WITH THE EXACT KEYS FROM YOUR FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyD8Zh5eSX61JlTl9FqA1XHaAuYTTWiBRr0",
  authDomain: "nirmana-website.firebaseapp.com",
  projectId: "nirmana-website",
  storageBucket: "nirmana-website.firebasestorage.app",
  messagingSenderId: "218083070209",
  appId: "1:218083070209:web:ac6b238ff6f896fcb74b00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export only the Database tool (No Storage needed)
export const db = getFirestore(app);