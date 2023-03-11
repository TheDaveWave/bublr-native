import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CenterMap({ onPress, color }) {
  return (
    <View style={styles.container}>
      {/* check the location of the camera and if it is not the user's location change button color */}
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <MaterialIcons name="my-location" color={color} size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "25%",
    width: "100%",
    top: "2.5%",
  },
  button: {
    flex: 1,
    alignSelf: "center",
  },
});
