// Providers:
import { LocationProvider } from "./context/LocationContext";

// Navigation imports:
import AppNav from "./navigators/AppNav";

export default function App() {
  
  return (
    <LocationProvider>
      <AppNav />
    </LocationProvider>
  );
}
