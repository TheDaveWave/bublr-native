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
    height: 450,
    width: 375,
    margin: 20,
    backgroundColor: "#D3D3D3",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  image: {
    height: 375,
    width: 375,
    borderRadius: 15,
  },
});
