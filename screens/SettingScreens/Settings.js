import { StyleSheet, View } from "react-native";

import SettingNavButton from "../../components/buttons/SettingNavButton";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <SettingNavButton
        title="About"
        icon="info"
        onPress={() => navigation.navigate("About")}
      />
      <SettingNavButton
        title="Account"
        // manage-accounts
        icon="person"
        onPress={() => navigation.navigate("Account")}
      />
      <SettingNavButton
        title="Security"
        icon="lock"
        onPress={() => navigation.navigate("Security")}
      />
      <SettingNavButton
        title="Support"
        icon="help"
        onPress={() => navigation.navigate("Support")}
      />
      <SettingNavButton
        title="Add Fountain"
        icon="add-location"
        onPress={() => navigation.navigate("AddFountain")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#D5D5D5",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
