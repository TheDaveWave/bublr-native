import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

// potentially remove location context and put methods in screens that actually require them.
// also add loading functionality for retrieving location.
export function LocationProvider({ children }) {
  const [foregroundStatus, setForegroundPermission] = useState(null);
  const [backgroundStatus, setBackgroundPermission] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [loading, setLoading] = useState(false);

  async function getPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setForegroundPermission(status);
    if (status) {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status) {
        setBackgroundPermission(status);
      }
    }
    // change this
    setLoading(false);
  }

  async function getUserLocation() {
    const response = await Location.getCurrentPositionAsync();
    console.log("User location:", response);
    setUserLocation(response);
    // change this
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await Location.hasServicesEnabledAsync();
      if (response) {
        await getUserLocation();
        // console.log("Permissions:", foregroundStatus, backgroundStatus);
      } else {
        await getPermissions();
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, getUserLocation, loading }}>
      {children}
    </LocationContext.Provider>
  );
}
