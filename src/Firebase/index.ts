/* eslint-disable import/no-duplicates */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
import { pingMe } from "../utils/pingme";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // if (
  //   process.env.NODE_ENV?.toLowerCase() === "development" &&
  //   firebaseConfig?.measurementId
  // ) {
  //   pingMe("Firebase analytics initialized");
  //   firebase.analytics();
  // }
}
pingMe(`Firebase initialized in ${process.env.NODE_ENV} mode`);

const { auth, firestore, storage } = firebase;

export { firebase, auth, firestore, storage };
