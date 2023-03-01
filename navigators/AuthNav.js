import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen imports:
import LoginScreen from "../screens/auth-screens/Login";

const Stack = createNativeStackNavigator();

export default function AuthNav({ routeName }) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
