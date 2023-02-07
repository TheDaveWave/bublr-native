import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [foregroundStatus, setForegroundPermission] = useState(null);
  const [backgroundStatus, setBackgroundPermission] = useState(null);
  const [userLocation, setUserLocation] = useState({});

  async function getPermissions() {
    const foreground = await Location.getForegroundPermissionsAsync()
      .then((response) => {
        setForegroundPermission(response);
      })
      .catch((err) => {
        console.log("Error getting foreground permissions:", err);
      });
    const background = await Location.getBackgroundPermissionsAsync()
      .then((response) => {
        setBackgroundPermission(response);
      })
      .catch((err) => {
        console.log("Error getting background permissions:", err);
      });

    // console.log("Permissions:", foregroundStatus, backgroundStatus);
  }

  async function getUserLocation() {
    const response = await Location.getCurrentPositionAsync();
    console.log("User location:", response);
    setUserLocation(response);
  }

  useEffect(() => {
    (async () => {
      await getPermissions();
      const response = await Location.hasServicesEnabledAsync()
      if(response) {
        await getUserLocation();
        console.log("Permissions:", foregroundStatus, backgroundStatus);
      } else {
        console.log("No location access");
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
