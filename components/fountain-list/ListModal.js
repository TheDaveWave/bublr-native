import { Modal, StyleSheet, Text, View } from "react-native";

export default function ListModal({ showModal, setShowModal }) {
  return (
    <View>
      <Modal
        animationType="slide"
        //   presentationStyle="pageSheet"
        visible={showModal}
      >
        <Text>Try swiping down.</Text>
      </Modal>
      <Text>Try swiping up.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "75%",
  },
});
