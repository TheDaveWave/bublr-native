import { StyleSheet, View } from "react-native";
import ListContainer from "../components/fountain-list/ListContainer";

export default function FountainList({ navigation }) {
  return (
    <View style={styles.container}>
      <ListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});
