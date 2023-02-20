import { StyleSheet, Text, View } from "react-native";

export default function ListItem({ fountain }) {
  console.log(fountain.id);

  return (
    <View style={styles.container}>
      <View>
        <Text>{fountain.id}</Text>
      </View>
      {/* List fountain properties here */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 250,
    width: 250,
    backgroundColor: "#FF0000",
    alignSelf: "center",
    marginVertical: 50,
  },
});
