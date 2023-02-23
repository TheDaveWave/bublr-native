import { StyleSheet, View, FlatList } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

import ListItem from "./ListItem";
import { useEffect, useState } from "react";

export default function ListContainer() {
  const database = getDatabase();
  const databaseRef = ref(database, "/fountains");
  const [fountains, setFountains] = useState([]);

  useEffect(() => {
    onValue(
      databaseRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((child) => {
          // const childKey = child.key;
          const childData = child.val();
          list.push(childData);
        });
        setFountains(list);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        enabled={true}
        data={fountains}
        // keyExtractor={(item) => item.key}
        renderItem={({ item }) => <ListItem fountain={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
