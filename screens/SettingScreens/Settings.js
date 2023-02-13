import { StyleSheet, View } from "react-native";

import SettingNavButton from "../../components/SettingNavButton";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <SettingNavButton
        title="About"
        onPress={() => navigation.navigate("About")}
      />
      <SettingNavButton
        title="Account"
        onPress={() => navigation.navigate("Account")}
      />
      <SettingNavButton
        title="Security"
        onPress={() => navigation.navigate("Security")}
      />
      <SettingNavButton
        title="Support"
        onPress={() => navigation.navigate("Support")}
      />
      <SettingNavButton
        title="Add Fountain"
        onPress={() => navigation.navigate("AddFountain")}
      />
    </View>
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
