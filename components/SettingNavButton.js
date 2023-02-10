import { StyleSheet, View, Pressable, Text } from "react-native";

export default function SettingNavButton({ onPress, title }) {
  return (
    <View style={styles.buttonOuter}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
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
  button: {},
  text: {},
});
