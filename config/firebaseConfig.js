import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCQjCb1xLzPF3iFEsmQ41VrzuenXKsAOdo",
  authDomain: "supafo-21ebe.firebaseapp.com",
  projectId: "supafo-21ebe",
  storageBucket: "supafo-21ebe.appspot.com",
  messagingSenderId: "844455718198",
  appId: "1:844455718198:web:3e2a2419a26a0f8a14d797",
  measurementId: "G-J9YK2YJH1X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;