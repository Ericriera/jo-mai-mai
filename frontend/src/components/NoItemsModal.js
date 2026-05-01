import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NoItemsModal = ({ modalVisible }) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>No queden més preguntes</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={styles.buttonTop}>
              <Text style={styles.textStyle}>Tornar a l'inici</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#000",
    marginTop: 5,
    transform: [{ translateX: 5 }],
  },
  buttonTop: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
  textStyle: {
    fontFamily: "Horizon",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Horizon",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default NoItemsModal;
