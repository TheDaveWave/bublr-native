import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Screen imports:
import HomeScreen from "../screens/Home";
import Map from "../screens/Map";
import FountainList from "../screens/FountainList";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 90,
          elevation: 0,
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#F5FBEF",
          borderRadius: 15,
          paddingBottom: 25,
          paddingTop: 10,
          shadowOffset: {
            height: 12,
            width: 0,
          },
          shadowOpacity: 0.5,
          shadowColor: "#E3E7DE",
        },
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
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
