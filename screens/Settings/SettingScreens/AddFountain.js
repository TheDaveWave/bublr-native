import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

export default function AddFountain({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permisson, requestPermisson] = Camera.useCameraPermissions();

  if(!permisson) {
    try {
      requestPermisson();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View>

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
