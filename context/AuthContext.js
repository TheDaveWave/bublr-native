import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async, jsonEval } from "@firebase/util";
// firebase auth accesses react-native core's async storage and throws a warning message.
// https://amanhimself.dev/blog/remove-asyncstorage-has-been-extracted-warning-using-firebase/

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // prefix for local storage to signify that the keys are for this app / bublr.
  const keyPrefix = "bublr/";

  async function emailSignIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("userCredential:", userCredential);
        setUser(userCredential.user);
        const userObj = {
          uid: userCredential.user.uid,
          token: userCredential.user.getIdTokenResult,
          refreshToken: userCredential.user.refreshToken,
        };
        console.log("User Object:", userObj);
        storeUserInfo(userObj);
      })
      .catch((err) => {
        console.log("Error loggin in with email:", err.code, err.message);
      });
  }

  async function emailSignUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("userCredentials signup:", userCredential);
        const userObj = {
          uid: userCredential.user.uid,
          token: userCredential.user.getIdTokenResult,
          refreshToken: userCredential.user.refreshToken,
        };
        storeUserInfo(userObj);
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
    await AsyncStorage.removeItem(`${keyPrefix}userInfo`);
    setUser(null);
  }

  // stores an object into local storage.
  async function storeUserInfo(object) {
    try {
      const newObject = JSON.stringify(object);
      await AsyncStorage.setItem(`${keyPrefix}userInfo`, newObject);
    } catch (err) {
      console.log("Error storing user info:", err);
    }
  }

  // check if local storage contains user info and if not make sure
  // user logs in.
  async function isLoggedIn() {
    try {
      // setLoading(true);
      let userInfo = await AsyncStorage.getItem(`${keyPrefix}userInfo`);
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUser(userInfo);
      }
      // setLoading(false);
    } catch (err) {
      console.log("Logged in error", err);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ emailSignIn, emailSignUp, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
