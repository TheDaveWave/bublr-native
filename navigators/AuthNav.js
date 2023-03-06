import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen imports:
import LoginScreen from "../screens/auth-screens/Login";
import SignUpScreen from "../screens/auth-screens/SignUp";

const Stack = createNativeStackNavigator();

export default function AuthNav({ routeName }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
