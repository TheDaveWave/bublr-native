import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListContainer from "../components/fountain-list/ListContainer";

import { testData } from "../test-data/fountain-data";

export default function FountainList({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ListContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: "#fff",
    height: 200,
    width: 200,
  },
  image: {
    height: 180,
    width: 180,
  },
});
