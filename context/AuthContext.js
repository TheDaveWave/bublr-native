import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase auth accesses react-native core's async storage and throws a warning message.
// https://amanhimself.dev/blog/remove-asyncstorage-has-been-extracted-warning-using-firebase/

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [user, setUser] = useState({});
  const [user, setUser] = useState(null);
  const auth = getAuth();

  async function emailSignIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential:", userCredential);
        setUser(userCredential.user);
        const userObj = {
          uid: userCredential.user.uid,
          token: userCredential.user.getIdTokenResult,
          refreshToken: userCredential.user.refreshToken,
        };
        
      })
      .catch((err) => {
        console.log("Error loggin in with email:", err.code, err.message);
      });
  }

  async function emailSignUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredentials signup:", userCredential);
        setUser(userCredential.user);
      })
      .catch((err) => {
        console.log("Error signing up new user:", err);
      });
  }

  async function logout() {
    await signOut(auth).catch((err) => {
      console.log("Error with logging out:", err);
    });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ emailSignIn, emailSignUp, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
