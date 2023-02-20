import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { API_KEY } from "@env";
import MapOverlay from "../components/map/MapOverlay";

import { testData } from "../test-data/fountain-data";
import FountainCallout from "../components/map/FountainCallout";
import ListContainer from "../components/fountain-list/ListContainer";

export default function Map({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [userLocation, setUserLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  // const [markerCoords, setMarkerCoords] = useState(null);
  const [foregroundPermissions, requestForegroundPermissions] =
    Location.useForegroundPermissions();

  if (!foregroundPermissions) {
    try {
      requestForegroundPermissions();
    } catch (err) {
      console.log("Error getting foreground permissions:", err);
    }
  }

  async function getUserLocation() {
    // get lask known position will return null if it is not available.
    const laskKnown = await Location.getLastKnownPositionAsync();
    console.log("Last known position:", laskKnown);
    // if last known position is not available or null then get current position.
    const response = laskKnown || (await Location.getCurrentPositionAsync());
    console.log("User location:", response);
    setUserLocation(response);
    // temporary for the draggable marker that I love to mess with.
    /*  setMarkerCoords({
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    }); */
    // potentially change this?
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await Location.hasServicesEnabledAsync();
      if (response) {
        await getUserLocation();
      }
    })();
  }, []);

  function getBoundaries() {
    if (mapRef === null) {
      return;
    }
    mapRef
      .getMapBoundaries()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
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
        {/* <MapViewDirections 
          apikey={API_KEY}
          origin={userLocation.coords}
          destination={testData[1]}
          strokeWidth={5}
          strokeColor="blue"
        /> */}
        {/*  <Marker
          draggable
          coordinate={markerCoords}
          onDragEnd={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
        /> */}
        {testData.map((ftn, index) => (
          <Marker key={index} coordinate={ftn.coordinate}>
            <FountainCallout imagePath={ftn.imagePath} />
          </Marker>
        ))}
      </MapView>
      {/* <MapOverlay /> */}
      {/* <ListContainer /> */}
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
