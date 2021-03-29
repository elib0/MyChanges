import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase/messaging';

export const fbOptions = {
  apiKey: 'AIzaSyBwXGst_OcMMLxpt7Uw6jZXKf4cWIpkGhw',
  authDomain: 'tasas-63cde.firebaseapp.com',
  databaseURL: 'https://tasas-63cde.firebaseio.com',
  projectId: 'tasas-63cde',
  storageBucket: 'tasas-63cde.appspot.com',
  messagingSenderId: '999746305763',
  appId: '1:999746305763:web:304f2729bf3b651e1f4fd6',
  measurementId: 'G-PJJ7RN98C9',
};

// Initialize Firebase
firebase.initializeApp(fbOptions);

// Mapping
export const FbDb = firebase.firestore();
export const FbAuth = firebase.auth();
export const FbStorage = firebase.storage().ref();
// export const FbMessaging = firebase.messaging();
export const FieldValue = firebase.firestore.FieldValue;

// Persistent data
FbDb.enablePersistence().catch(function(e) {
  console.error(e)
  if (e.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (e.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export default {
  FbDb,
  FbAuth,
  FbStorage,
  // FbMessaging,
};
