import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

// Navigation component imports:
import StackNav from "./StackNav";
import BottomTabs from "./BottomTabs";

const ref = createNavigationContainerRef();

export default function AppNav() {
  const [routeName, setRouteName] = useState();

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        // const previousRoute = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        console.log(currentRouteName);
        setRouteName(currentRouteName);
      }}
    >
      {/* <StackNav /> */}
      <BottomTabs routeName={routeName}/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
