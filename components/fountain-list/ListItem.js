import { Image, StyleSheet, Text, View } from "react-native";

export default function ListItem({ fountain }) {
  // HANDLE Errors with retrieving ftn data
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: fountain.imageUrl }} />
      </View>
      {/* List fountain properties here */}
      <View>
        {/* <Text>{JSON.stringify(fountain)}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    backgroundColor: "#D3D3D3",
    alignSelf: "center",
    margin: 20,
  },
  image: {
    height: 250,
    width: 250,
  },
});
