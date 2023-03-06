import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthNav from "./AuthNav";

// Navigation component imports:
import BottomTabs from "./BottomTabs";

const ref = createNavigationContainerRef();

export default function AppNav() {
  const [routeName, setRouteName] = useState();

  const { user } = useContext(AuthContext);

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
      {user !== null ? <BottomTabs routeName={routeName} /> : <AuthNav routeName={routeName}/>}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
