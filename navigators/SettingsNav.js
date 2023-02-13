import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Settings Screen imports:
import Settings from "../screens/SettingScreens/Settings";
import About from "../screens/SettingScreens/About";
import Account from "../screens/SettingScreens/Account";
import AddFountain from "../screens/SettingScreens/AddFountain";
import Security from "../screens/SettingScreens/Security";
import Support from "../screens/SettingScreens/Support";

const Stack = createNativeStackNavigator();

export default function SettingsNav() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Settings",
        }}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen
        name="AddFountain"
        component={AddFountain}
        options={{
          headerTitle: "Add Fountain",
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}
