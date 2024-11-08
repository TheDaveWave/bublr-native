import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Screen imports:
import HomeScreen from "../screens/Home";
import Map from "../screens/Map";
import FountainList from "../screens/FountainList";
import Profile from "../screens/Profile";
import SettingsNav from "./SettingsNav";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ routeName }) {
  const visible = routeName === "AddFountain";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        // forces component unmount checkout out freeze, or another way to re-render certain components.
        unmountOnBlur: true,
        // tabBarActiveTintColor: "#76E5FC",
        // tabBarActiveBackgroundColor: "#DEE2D9",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fountains"
        component={FountainList}
        options={{
          tabBarLabel: "Fountains",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsNav"
        component={SettingsNav}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
          tabBarStyle: visible ? styles.hidden : styles.tabBar,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    marginBottom: 15,
  },
  hidden: {
    display: "none",
  },
});
