import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBEVEISSCkHxzo6MIbbTCDvgojtWwHs-vM',
  authDomain: 'reactnativeapp-madnezzz.firebaseapp.com',
  projectId: 'reactnativeapp-madnezzz',
  storageBucket: 'reactnativeapp-madnezzz.appspot.com',
  messagingSenderId: '1078769970144',
  appId: '1:1078769970144:web:179d3a4e16caab14eed985',
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
