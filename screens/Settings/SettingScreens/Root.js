import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingNavButton from "../../../components/SettingNavButton";

export default function Root({ navigation }) {
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <SettingNavButton
        title="About"
        onPress={() => navigation.navigate("About")}
      />
      <SettingNavButton title="Account" onPress={() => navigation.navigate("Account")}/>
      <SettingNavButton title="Security" onPress={() => navigation.navigate("Security")}/>
      <SettingNavButton title="Support" onPress={() => navigation.navigate("Support")}/>
      <SettingNavButton title="Add Fountain" onPress={() => navigation.navigate("AddFountain")}/>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
