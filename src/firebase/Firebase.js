import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjXNbSRNsmy6fh0MZoucYvngQnZRYmU6o",
  authDomain: "fast-react-project-8d343.firebaseapp.com",
  projectId: "fast-react-project-8d343",
  storageBucket: "fast-react-project-8d343.firebasestorage.app",
  messagingSenderId: "936661662186",
  appId: "1:936661662186:web:66f82d63e2d95b166c9a93"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)