import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB9jFjrsUHiPY_7O6Y8My95pRH_1Z0bLpw',
  authDomain: 'typscript-redux-netflix.firebaseapp.com',
  projectId: 'typscript-redux-netflix',
  storageBucket: 'typscript-redux-netflix.appspot.com',
  messagingSenderId: '269144285450',
  appId: '1:269144285450:web:91001eda796f8befc59af3',
  measurementId: 'G-YHJLXLJ2HP'
};
const app = initializeApp(firebaseConfig);
export default getAuth(app);
