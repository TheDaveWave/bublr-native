import { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import CircleButton from "../../components/buttons/camera-buttons/CircleButton";
import CameraButton from "../../components/buttons/camera-buttons/CameraButton";

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

  // NEED TO update to only allow users with location services enabled upload a fountain.
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
        })
        .catch((err) => {
          console.log("Error taking picture:", err);
        });
    } else {
      alert("Lol you can't take the picture!");
    }
  }

  // resets the preview and allows user to retake picture.
  function reset() {
    setPicture(null);
    setPaused(false);
  }

  async function submit() {
    await Location.getCurrentPositionAsync()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("Error getting location", err);
      });
    await MediaLibrary.saveToLibraryAsync(picture);
    alert("Picture saved.");
    setPicture(null);
    setPaused(false);
    // add a post request here.
    // navigation.goBack();
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
        <ImageBackground style={styles.camera} source={{ uri: picture }} />
      )}
      <View style={styles.buttonContainer}>
        <CameraButton icon="done" onPress={() => submit()} disabled={!paused} />
        <CircleButton onPress={() => pressFunction()} disabled={paused} />
        <CameraButton
          icon="refresh"
          onPress={() => reset()}
          disabled={!paused}
        />
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
    justifyContent: "center",
    flexDirection: "row",
  },
});
