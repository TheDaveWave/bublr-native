import { initializeApp } from "firebase/app";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./context/AuthContext.js";
import firebaseConfig from "./firebaseConfig.js";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Providers:

// Navigation imports:
import AppNav from "./navigators/AppNav";
import { getAuth } from "firebase/auth";

// initialze firebase app.
initializeApp(firebaseConfig);
/* // update firebase auth perstistence to use AsyncStorage.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}); */

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
