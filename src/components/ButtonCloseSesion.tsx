import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { stylesButton } from "../globalStyles/buttons.styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export const ButtonCloseSesion = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const onCloseSession = () => {
    setIsAuthenticated({
      token: "",
      user: null,
      status: "not-authenticated",
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onCloseSession()}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 9,
        // backgroundColor: "red",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: wp(2),

        marginTop: hp(3),
      }}
    >
      <Ionicons name={"arrow-back-circle"} size={wp(5)} color={"white"} />
      <Text
        style={{
          color: "white",
          fontSize: wp(4),
        }}
      >
        Cerrar sesión
      </Text>

      {/* <Text>Hola mundo</Text> */}
    </TouchableOpacity>
  );
};
