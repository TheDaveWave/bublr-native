import { useContext, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/styles";

export default function SignUpScreen({ navigation }) {
  const { emailSignUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    emailSignUp(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          textContentType="emailAddress" // iOS only
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
        />
        <Button title="Submit" onPress={() => submit()} />
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
