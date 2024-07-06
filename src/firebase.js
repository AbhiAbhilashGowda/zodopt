import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDtJIWizGscqXZztOF3lPg2VAZTKJ78bEE',
  authDomain: 'portal-user-775f0.firebaseapp.com',
  projectId: 'portal-user-775f0',
  storageBucket: 'portal-user-775f0.appspot.com',
  messagingSenderId: '425031534755',
  appId: '1:425031534755:web:e708dccac800ac4be61716',
  measurementId: 'G-P5FD8R7KPG',
  databaseUrl: 'https://portal-user-775f0-default-rtdb.firebaseio.com'
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
