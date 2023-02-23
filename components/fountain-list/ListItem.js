import { Image, StyleSheet, Text, View } from "react-native";

export default function ListItem({ fountain }) {

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: fountain.imageUrl }} />
      </View>
      {/* List fountain properties here */}
      <View>
        {/* <Text>{JSON.stringify(fountain)}</Text> */}
        {/* <Text>Image Url: {fountain.imageUrl}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 250,
    width: 250,
    backgroundColor: "#FF0000",
    alignSelf: "center",
    margin: 20,
  },
  image: {
    height: 250,
    width: 250,
  },
});
