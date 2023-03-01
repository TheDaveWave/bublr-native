import { createContext, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
// firebase auth accesses react-native core's async storage and throws a warning message.
// https://amanhimself.dev/blog/remove-asyncstorage-has-been-extracted-warning-using-firebase/

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  // const [user, setUser] = useState(null);
  const [uuid, setUuid] = useState(null);
  const auth = getAuth();

  async function emailSignIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential:", userCredential);
        // const user = userCredential.user;
        setUser(userCredential.user);
      })
      .catch((err) => {
        console.log("Error loggin in with email", err);
      });
  }

  function handleAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uuid);
        setUuid(user.uuid);
      } else {
        console.log("User is logged out.");
      }
    });
  }

  return (
    <AuthContext.Provider value={{ emailSignIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
