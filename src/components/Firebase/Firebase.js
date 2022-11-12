import { initializeApp, firebase } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDQM8Pt2pWqbSolOKoyEBw31GJU_SLTDrM",
  authDomain: "marvel-quizzz.firebaseapp.com",
  projectId: "marvel-quizzz",
  storageBucket: "marvel-quizzz.appspot.com",
  messagingSenderId: "1049224162833",
  appId: "1:1049224162833:web:a884128ce390eb1b674bb0",
};

class Firebase {
  constructor() {
    const app = initializeApp(config);

    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  auth() {
    return this.auth;
  }
  db() {
    return this.db;
  }

  signupUser = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  loginUser = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  signoutUser = () => {
    signOut(this.auth);
  };

  passwordReset = (auth, email) => {
    return sendPasswordResetEmail(auth, email);
  };

  user = (db, uid) => {
    return doc(db, `users/${uid}`);
  };
  addData = (path, obj) => {
    return setDoc(path, obj);
  };
  getData = (path) => {
    return getDoc(path);
  };
}

export default Firebase;
