import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CircleButton({ onPress, disabled }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="circle" color="#FF0000" size={70} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderColor: "#FF0000",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 50,
  },
});
