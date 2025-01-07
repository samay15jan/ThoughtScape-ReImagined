import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCE4sGNHvcHmL-rwygzGgthB3D2qGT9j_0",
  authDomain: "thoughtscape-reimagined.firebaseapp.com",
  projectId: "thoughtscape-reimagined",
  storageBucket: "thoughtscape-reimagined.firebasestorage.app",
  messagingSenderId: "970052455550",
  appId: "1:970052455550:web:2911d193de6f03cde21c2f",
  measurementId: "G-306XW075CK",
  databaseURL: "https://thoughtscape-reimagined-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
