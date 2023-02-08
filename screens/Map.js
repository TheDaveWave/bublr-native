import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";
import { useContext, useState } from "react";

export default function Map({ navigation }) {
  const { userLocation } = useContext(LocationContext);

  const [markerCoords, setMarkerCoords] = useState({
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
  }); 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker draggable
          coordinate={markerCoords}
          onDragEnd={e => setMarkerCoords(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
