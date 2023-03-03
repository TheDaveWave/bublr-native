import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function Account({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <View style={styles.buttonOuter}>
        <Pressable style={styles.button} onPress={() => logout()}>
          <Text style={styles.text}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOuter: {
    // have the button fit content width.
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3DA5D9",
    padding: 10,
    borderRadius: 10,
    margin: 2,
  },
  text: {
    color: "#fff",
  },
});
