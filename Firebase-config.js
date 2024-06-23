import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAu1KnNpXiuCEObaDG5CfxHw-cIOsjCcw0",
    authDomain: "quiz11-d54a3.firebaseapp.com",
    databaseURL: "https://quiz11-d54a3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quiz11-d54a3",
    storageBucket: "quiz11-d54a3.appspot.com",
    messagingSenderId: "641838904440",
    appId: "1:641838904440:web:d3d00eaf39b5a231e5e98d",
    measurementId: "G-46HHX0XMLY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)        
});
const database = getDatabase(app);

export { auth, database };