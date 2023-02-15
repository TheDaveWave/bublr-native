import { Image, StyleSheet, View } from "react-native";
import { Callout } from "react-native-maps";

export default function FountainCallout({ imagePath }) {
  return (
    <Callout>
      <View style={styles.container}>
        <Image style={styles.image} source={imagePath} />
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
  },
});
