import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Navigation component imports:
import StackNav from "./StackNav";

export default function AppNav() {
  return (
    <NavigationContainer>
      <StackNav />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
