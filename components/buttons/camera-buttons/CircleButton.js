import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CircleButton({ onPress, disabled }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="circle" color="#FF0000" size={70} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#FF0000",
    borderRadius: 42,
    padding: 3,
  },
  iconContainer: {
    /*  borderColor: "#FF0000",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 50, */
    justifyContent: "center",
    alignItems: "center",
  },
});
