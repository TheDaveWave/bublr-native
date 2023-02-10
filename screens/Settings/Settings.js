import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsNav from "./SettingsNav";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <SettingsNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
  },
});
