import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CameraButton({ onPress, disabled, icon }) {
  return (
    <View style={styles.camerButtonContainer}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <MaterialIcons name={icon} color="#000" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  camerButtonContainer: {
    height: 84,
    justifyContent: "center",
  },
});
