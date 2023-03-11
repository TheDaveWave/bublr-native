import { StyleSheet, View } from "react-native";
import CenterMap from "./CenterMap";

export default function MapOverlay({ centerMap, color, setColor }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CenterMap onPress={() => centerMap()} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "20%",
    width: "12.5%",
    top: "20%",
    left: "2.5%",
    // backgroundColor: "#F5FBEF",
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
});
