import { StyleSheet, View, FlatList } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Component Imports:
import ListItem from "./ListItem";

export default function ListContainer() {
  // get the instance of the root database from Firebase.
  const database = getDatabase();
  // create a reference to the fountains location on the database.
  const databaseRef = ref(database, "/fountains");
  const [fountains, setFountains] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();

  // HANDLE Errors with retrieving ftn data

  // Make queries to firebase database.

  // LOOK into child events instead of on value events.
  // Grab the database values from Firebase.
  function fetchDatabase() {
    onValue(
      databaseRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((child) => {
          // const childKey = child.key;
          // access the values of each child item from the snapshot of the database.
          const childData = child.val();
          // push each child object into an array.
          list.push(childData);
        });
        // set the fountains state equal to the list of child objects from the database.
        setFountains(list);
      },
      {
        onlyOnce: true,
      }
    );
  }

  useEffect(() => {
    fetchDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        enabled={true}
        data={fountains}
        // keyExtractor={(item) => item.key}
        renderItem={({ item }) => <ListItem fountain={item} />}
        style={[
          styles.list,
          {
            marginBottom: tabBarHeight + 10,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    alignSelf: "center",
  },
});
