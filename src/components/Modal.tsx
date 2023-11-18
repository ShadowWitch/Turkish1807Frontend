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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
              width: wp(90),
              //   height: height * 0.3,
              maxHeight: hp(50),
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: wp(5),
                // backgroundColor: "red",
                textAlign: "center",
                marginBottom: hp(1),
              }}
            >
              {title}
            </Text>
            <Text style={styles.modalText}>{description}</Text>
            <View
              style={{
                marginTop: hp(3),
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: wp(100),
              }}
            >
              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, styles.buttonAccept]}
                onPress={onAccept}
              >
                <Text style={styles.textStyle}>{acceptText}</Text>
              </TouchableOpacity> */}

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
                style={[styles.button, styles.buttonAccept]}
                onPress={onAccept}
              >
                <Text style={styles.textStyle}>{acceptText}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowModal(!showModal)}
              >
                <Text style={styles.textStyle}>{cancelText}</Text>
              </TouchableOpacity> */}
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
    marginTop: hp(3),

    // backgroundColor: "#ffffff24",
    // backfaceVisibility: "hidden",
    // backgroundColor: "red",
    // position: "absolute",
    top: "30%",
  },
  modalView: {
    // position: "relative",

    margin: wp(5),
    backgroundColor: "white",
    // backgroundColor: "red",
    borderRadius: 20,

    paddingHorizontal: wp(5),
    paddingVertical: hp(5),

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
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
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
    marginBottom: hp(1),
    textAlign: "center",
    // backgroundColor: "red",
  },
});
