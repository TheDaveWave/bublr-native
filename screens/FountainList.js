import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListContainer from "../components/fountain-list/ListContainer";

import { testData } from "../test-data/fountain-data";

export default function FountainList({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Back Screen Button" onPress={() => {
        console.log("It worked!");
      }}/>
      <ListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
});
