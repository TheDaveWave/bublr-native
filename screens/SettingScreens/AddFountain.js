import { useState } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import CircleButton from "../../components/buttons/CameraButtons/CircleButton";

export default function AddFountain({ navigation }) {
  const [cameraRef, setCameraRef] = useState(null);
  const [ready, setReady] = useState(false);
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();
  const [paused, setPaused] = useState(false);
  const [picture, setPicture] = useState(null);

  // update these if statements.
  if (!permission) {
    try {
      requestPermission();
    } catch (err) {
      console.log("Media permissions error:", err);
    }
  }

  if (!camPermission) {
    try {
      requestCamPermission();
    } catch (err) {
      console.log("Camera permission error:", err);
    }
  }

  if (!locationPermission) {
    try {
      requestLocationPermission();
    } catch (err) {
      console.log("Location permisson error:", err);
    }
  }

  async function pressFunction() {
    if (ready) {
      setPaused(true);
      await cameraRef
        .takePictureAsync()
        .then((response) => {
          console.log("picture taken:", response);
          // save the uri of the image to the devices photo library.
          // MediaLibrary.saveToLibraryAsync(response.uri);
          setPicture(response.uri);
          /* does not work after picture state is set since cameraref becomes null
          and the image is rendered and not the camera. The cameraref is set when camera renders. */
          // pause preview while paused is true.
          // cameraRef.pausePreview();
          Location.getCurrentPositionAsync()
            .then((response) => {
              console.log("Picture location:", response);
              // setPaused(false);
              // continue preview when after location and picture are taken.
              // cameraRef.resumePreview();
            })
            .catch((err) => {
              console.log("Error getting location:", err);
            });
        })
        .catch((err) => {
          console.log("Error taking picture:", err);
        });
    } else {
      alert("Lol you can't take the picture!");
    }
  }

  return (
    <View style={styles.container}>
      {!picture ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          onCameraReady={() => setReady(true)}
          style={styles.camera}
          type={CameraType.back}
        ></Camera>
      ) : (
        // <View style={styles.camera}>
          <ImageBackground style={styles.camera} source={{uri: picture}} />
        /* </View> */
      )}
      <View style={styles.buttonContainer}>
        <CircleButton onPress={() => pressFunction()} disabled={paused} />
      </View>
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
    flex: 2 / 3,
    width: "100%",
  },
  buttonContainer: {
    flex: 1 / 3,
    alignSelf: "center",
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
