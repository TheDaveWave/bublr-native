import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>About</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
  },
});