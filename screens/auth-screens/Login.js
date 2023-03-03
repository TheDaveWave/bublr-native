import { useContext, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { emailSignIn, emailSignUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    emailSignUp(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <View>
      <Text>This is the login screen.</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress" // iOS only
        placeholder="Email"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Submit" onPress={() => submit()} />
    </View>
  );
}
