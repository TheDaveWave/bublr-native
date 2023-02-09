import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";
import { useContext, useState, useRef } from "react";
import MapOverlay from "../components/MapOverlay";

const testData = [
  {
    id: 1,
    latitude: 46.9249837,
    longitude: -96.8145239,
  },
  {
    id: 2,
    latitude: 46.8699271,
    longitude: -96.7905943,
  },
  {
    id: 3,
    latitude: 46.9243756,
    longitude: -96.7804359,
  },
  {
    id: 4,
    latitude: 46.87257304836294,
    longitude: -96.78109645843506,
  },
];

export default function Map({ navigation }) {
  const { userLocation } = useContext(LocationContext);
  const [mapRef, setMapRef] = useState(null);
  // let mapRef = useRef(null);

  const [markerCoords, setMarkerCoords] = useState({
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
  });

  function getBoundaries() {
    if (mapRef === null) {
      return;
    }
    mapRef
      .getMapBoundaries()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        ref={(ref) => setMapRef(ref)}
        onMapReady={() => {
          getBoundaries();
        }}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          draggable
          coordinate={markerCoords}
          onDragEnd={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
        />
        {testData.map((ftn, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: ftn.latitude, longitude: ftn.longitude }}
            title="This is a fountain."
            description="Drink it!"
          />
        ))}
      </MapView>
      {/* <MapOverlay /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    margin: 0,
  },
});
