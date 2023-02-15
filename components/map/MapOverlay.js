import { StyleSheet, View } from "react-native";

export default function MapOverlay() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 50,
    width: 50,
    top: "20%",
    left: "20%",
    backgroundColor: "#F5FBEF",
  },
});
