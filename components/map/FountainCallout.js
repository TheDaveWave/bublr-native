import { Image, StyleSheet, View } from "react-native";
import { Callout } from "react-native-maps";

export default function FountainCallout({ imagePath }) {
  return (
    <Callout>
      <View style={styles.container}>
        {/* FIX when user is on map and puts app in background the images do not render
            when user pulls app back to foreground. */}
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
