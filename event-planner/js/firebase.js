import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// config
const firebaseConfig = {
  apiKey: "AIzaSyAqYibc_E7HVgidHQRl0tuOl5WRnne1mNQ",
  authDomain: "event-planner-c7721.firebaseapp.com",
  projectId: "event-planner-c7721",
  storageBucket: "event-planner-c7721.firebasestorage.app",
  messagingSenderId: "94353002450",
  appId: "1:94353002450:web:6de3dfb2edf9d0521c820b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };