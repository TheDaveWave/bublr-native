import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Settings Screen imports:
import Root from "./SettingScreens/Root";
import About from "./SettingScreens/About";
import Account from "./SettingScreens/Account";
import AddFountain from "./SettingScreens/AddFountain";
import Security from "./SettingScreens/Security";
import Support from "./SettingScreens/Support";

const Stack = createNativeStackNavigator();

export default function SettingsNav() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={Root}
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
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}
