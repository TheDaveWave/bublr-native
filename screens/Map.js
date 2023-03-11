import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildRemoved,
  onChildChanged,
  query,
  get,
} from "firebase/database";

// Component imports:
import { API_KEY } from "@env";
import FountainCallout from "../components/map/FountainCallout";
import MapOverlay from "../components/map/MapOverlay/MapOverlay";

export default function Map({ navigation }) {
  // Local state:
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#0000FF");
  const [mapRef, setMapRef] = useState(null);
  const [userLocation, setUserLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [fountains, setFountains] = useState([]);
  // get access to the foreground location permissions.
  const [foregroundPermissions, requestForegroundPermissions] =
    Location.useForegroundPermissions();
  // Setup a reference to the firebase database.
  const database = getDatabase();
  const fountainsRef = ref(database, "/fountains");

  async function getFountains() {
    const list = [];
    (await get(fountainsRef)).forEach((child) => {
      const childKey = child.key;
      const childData = child.val();
      list.push(childData);
    });
    setFountains(list);
    // addChildListeners();
  }

  function addChildListeners() {
    onChildAdded(fountainsRef, updateFountains);
    onChildChanged(fountainsRef, updateFountains);
    onChildRemoved(fountainsRef, updateFountains);
  }

  function updateFountains(snapshot) {
    const list = [];
    snapshot.forEach((child) => {
      const childKey = child.key;
      const childData = child.val();
      list.push(childData);
    });
    console.log(list);
    if (list.length > 0) {
      setFountains(list);
    }
  }

  // check the location permissions and request access if needed.
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
    // console.log("Last known position:", laskKnown);
    // if last known position is not available or null then get current position.
    const response = laskKnown || (await Location.getCurrentPositionAsync());
    // console.log("User location:", response);
    setUserLocation(response);
    // potentially change this?
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getFountains();
      const response = await Location.hasServicesEnabledAsync();
      if (response) {
        await getUserLocation();
      }
    })();
  }, []);

  // uses the map reference to call the setCamera function which
  // centers the camera onto the users location.
  function centerMap() {
    if (mapRef === null) {
      return;
    }
    mapRef.animateCamera(
      {
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
      },
      2000
    );
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
        style={styles.map}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={() => setColor("#808080")}
        onRegionChangeComplete={(e) => {
          // fine tune the margin and make a better check.
          const margin = 0.0008;
          const location = userLocation.coords;
          const checkLat =
            e.latitude < location.latitude + margin &&
            e.latitude > location.latitude - margin;
          const checkLng =
            e.longitude < location.longitude + margin &&
            e.longitude > location.longitude - margin;
          if (checkLat && checkLng) {
            setColor("#0000FF");
          }
        }}
      >
        {fountains.map((ftn, index) => (
          <Marker key={index} coordinate={ftn.coords}>
            <FountainCallout imagePath={ftn.imageUrl} />
          </Marker>
        ))}
      </MapView>
      <MapOverlay centerMap={centerMap} color={color} />
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
