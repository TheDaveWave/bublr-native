import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen imports:
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
