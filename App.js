import { initializeApp } from "firebase/app";
import "react-native-gesture-handler";
import firebaseConfig from "./firebaseConfig.js";
// Providers:

// Navigation imports:
import AppNav from "./navigators/AppNav";

initializeApp(firebaseConfig);

export default function App() {
  return <AppNav />;
}
