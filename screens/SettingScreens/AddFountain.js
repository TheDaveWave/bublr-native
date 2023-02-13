import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as MediaLibrary from "expo-media-library";

export default function AddFountain({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [ready, setReady] = useState(false);
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    try {
      requestPermission();
    } catch (err) {
      console.log(err);
    }
  }

  if (!camPermission) {
    try {
      requestCamPermission();
    } catch (err) {
      console.log(err);
    }
  }

  async function pressFunction() {
    if (ready) {
      await cameraRef
        .takePictureAsync()
        .then((response) => {
          console.log("picture taken", response);
          MediaLibrary.saveToLibraryAsync(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Lol you can't take the picture!");
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        onCameraReady={() => setReady(true)}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressFunction()}
          >
            <MaterialIcons name="add-circle" color="#FF0000" size={100} />
          </TouchableOpacity>
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
  buttonContainer: {
    // flex: 1,
    alignSelf: "center",
    marginTop: 600,
    backgroundColor: "#fff",
    borderRadius: 50,
    // height: 20,
    // bottom: 15,
  },
  button: {
    // height: 20,
    // backgroundColor: "#FF0000",
    // color: "#FF0000"
  },
});
