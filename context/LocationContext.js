import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [foregroundStatus, setForegroundPermission] = useState(null);
  const [backgroundStatus, setBackgroundPermission] = useState(null);
  const [userLocation, setUserLocation] = useState({});

  async function getPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setForegroundPermission(status);
    if (status) {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status) {
        setBackgroundPermission(status);
      }
    }
  }

  async function getUserLocation() {
    const response = await Location.getCurrentPositionAsync();
    console.log("User location:", response);
    setUserLocation(response);
  }

  useEffect(() => {
    (async () => {
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
    <LocationContext.Provider value={{ userLocation, getUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
