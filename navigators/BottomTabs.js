import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import Map from "../screens/Map";
import FountainList from "../screens/FountainList";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Map" component={Map}/>
            <Tab.Screen name="Fountains" component={FountainList}/>
            <Tab.Screen name="Profile" component={Profile}/>
            <Tab.Screen name="Settings" component={Settings}/>
        </Tab.Navigator>
    );
}