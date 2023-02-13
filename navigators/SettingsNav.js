import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Settings Screen imports:
import Settings from "../screens/settings-screens/Settings";
import About from "../screens/settings-screens/About";
import Account from "../screens/settings-screens/Account";
import AddFountain from "../screens/settings-screens/AddFountain";
import Security from "../screens/settings-screens/Security";
import Support from "../screens/settings-screens/Support";

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
