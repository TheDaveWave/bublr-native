import { StyleSheet, View } from "react-native";

export default function ListItem({ fountain }) {
  return (
    <View style={styles.container}>
      <View></View>
      {/* List fountain properties here */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 50,
    backgroundColor: "#FF0000",
  },
});
