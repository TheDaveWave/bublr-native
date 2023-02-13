import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SettingNavButton({ onPress, title, icon }) {
  return (
    <View style={styles.buttonOuter}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {/* Make the button and the icon display in a single row */}
        <View style={styles.button}>
          <MaterialIcons name={icon} color="#000" size={20} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    borderColor: "#000",
    borderBottomWidth: 2,
    paddingLeft: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
  },
});
