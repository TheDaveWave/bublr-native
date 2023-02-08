import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Navigation component imports:
import StackNav from "./StackNav";
import BottomTabs from "./BottomTabs";

export default function AppNav() {
  return (
    <NavigationContainer>
      {/* <StackNav /> */}
      <BottomTabs />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
