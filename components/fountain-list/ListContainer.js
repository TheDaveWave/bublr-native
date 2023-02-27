import { StyleSheet, View, FlatList } from "react-native";
import {
  getDatabase,
  ref,
  get,
  onChildAdded,
  onChildRemoved,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Component Imports:
import ListItem from "./ListItem";

export default function ListContainer() {
  // get the instance of the root database from Firebase.
  const database = getDatabase();
  // create a reference to the fountains location on the database.
  const fountainsRef = ref(database, "/fountains");
  const [fountains, setFountains] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();

  // HANDLE Errors with retrieving ftn data

  // Grab the database values from Firebase.
  async function fetchDatabase() {
    const list = [];
    (await get(fountainsRef)).forEach((child) => {
      const childKey = child.key;
      // console.log(childKey);
      const childData = child.val();
      list.push(childData);
    });
    setFountains(list);
  }

  function addChildListeners() {
    onChildAdded(fountainsRef, (snapshot) => {
      const list = fountains;
      list.push(snapshot.val());
      if (list.length !== fountains.length) setFountains(list);
    });
    onChildRemoved(fountainsRef, (snapshot) => {
      const list = fountains;
      for (let i = 0; i < list.length; i++) {
        if (list[i].imageUrl === snapshot.imageUrl) {
          list.splice(i, 1);
        }
      }
      if (list.length !== fountains.length) setFountains(list);
    });
  }

  useEffect(() => {
    (async () => {
      await fetchDatabase();
      // addChildListeners();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        enabled={true}
        data={fountains}
        // keyExtractor={(item) => item.key}
        renderItem={({ item }) => <ListItem fountain={item} />}
        style={{
          marginBottom: tabBarHeight + 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
