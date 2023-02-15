import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListModal from "../components/fountain-list/ListModal";
import TestList from "../components/fountain-list/TestList";

import { testData } from "../test-data/fountain-data";

const picture = require("../assets/fountain-images/eda-fountain1.jpeg");


export default function FountainList({ navigation }) {
  const [showModal, setShowModal] = useState(true);

  return (
    // <SafeAreaView 
    //   // style={styles.container}
    // >
      /* <Text>This will be a list of founatins.</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={picture} resizeMode="contain" />
      </View> */
      /* <ListModal showModal={showModal} setShowModal={setShowModal}/> */
      <TestList />
    /* </SafeAreaView> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
