import { StyleSheet, Text, View } from "react-native";

// Providers:
import { LocationProvider } from "./context/LocationContext";

// Navigation imports:
import AppNav from "./navigators/AppNav";

export default function App() {
  
  return (
    <LocationProvider>
      <AppNav />
    </LocationProvider>
  );
}
