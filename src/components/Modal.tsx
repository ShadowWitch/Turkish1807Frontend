import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

interface Props {
  showModal?: boolean;
  setShowModal: (showModal: boolean) => void;

  onAccept: () => void;
  onCancel?: () => void;

  title?: string;
  description?: string;

  acceptText?: string;
  cancelText?: string;
}

export const ModalComponent = ({
  setShowModal,
  showModal = false,
  description = "Descripcion example",
  title = "Titulo example",
  onAccept,
  onCancel,
  acceptText = "Confirmar",
  cancelText = "Cancelar",
}: Props) => {
  //   const [showModalVisible, setShowModalVisible] = useState(false);

  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              width: width * 0.9,
              //   height: height * 0.3,
              maxHeight: height * 0.5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                // backgroundColor: "red",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {title}
            </Text>
            <Text style={styles.modalText}>{description}</Text>
            <View
              style={{
                marginTop: 20,
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, styles.buttonAccept]}
                onPress={onAccept}
              >
                <Text style={styles.textStyle}>{acceptText}</Text>
              </TouchableOpacity>

              {onCancel && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.button, styles.buttonClose]}
                  //   onPress={() => setShowModal(!showModal)}
                  onPress={onCancel}
                >
                  <Text style={styles.textStyle}>{cancelText}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowModal(!showModal)}
              >
                <Text style={styles.textStyle}>{cancelText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

    // backgroundColor: "#ffffff24",
    // backfaceVisibility: "hidden",
    // backgroundColor: "red",
    // position: "absolute",
    top: "30%",
  },
  modalView: {
    // position: "relative",

    margin: 20,
    backgroundColor: "white",
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
    backgroundColor: "#f84b4b",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  buttonAccept: {
    // backgroundColor: "#2196F3",

    backgroundColor: "#16213E",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
