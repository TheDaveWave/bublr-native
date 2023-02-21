import { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
// import { ref, onValue, push, update, remove } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// Component Imports:
import CircleButton from "../../components/buttons/camera-buttons/CircleButton";
import CameraButton from "../../components/buttons/camera-buttons/CameraButton";

export default function AddFountain({ navigation }) {
  // Camera state:
  const [cameraRef, setCameraRef] = useState(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [picture, setPicture] = useState(null);
  // Permissions:
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();

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

  async function snapPicture() {
    if (ready) {
      setPaused(true);
      await cameraRef
        .takePictureAsync()
        .then((response) => {
          console.log("picture taken:", response);
          setPicture(response.uri);
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
    // LOOK at changing when the position is grabbed.
    const location = await Location.getCurrentPositionAsync();
    /* .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("Error getting location", err);
      }); */
    console.log("Location:", location);
    console.log("URI:", picture);
    // change file size?

    // create blob
    const blob = new Blob([picture]);
    console.log("blob:", blob, `blob size: ${blob.size} bytes`);
    // upload photo to firebase.

    // get url and add to database on firebase.

    /* await MediaLibrary.saveToLibraryAsync(picture);
    alert("Picture saved."); */
    setPicture(null);
    setPaused(false);

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
        <CircleButton onPress={() => snapPicture()} disabled={paused} />
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
