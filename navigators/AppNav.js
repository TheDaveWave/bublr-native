import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";

// Navigation component imports:
import BottomTabs from "./BottomTabs";

import { LocationContext } from "../context/LocationContext";
import { ActivityIndicator, View } from "react-native";

const ref = createNavigationContainerRef();

export default function AppNav() {
  const [routeName, setRouteName] = useState();
  // possibly change this.
  // const { loading } = useContext(LocationContext);

  // Have loading animation at least for saving headache during development.
  // the issue with this is that it restricts access to other parts of the app
  // that do not require access to location.
  /* if(loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator size="large" />
      </View>
    )
  } */

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        // const previousRoute = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        // console.log(currentRouteName);
        setRouteName(currentRouteName);
      }}
    >
      {/* <StackNav /> */}
      <BottomTabs routeName={routeName} />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
