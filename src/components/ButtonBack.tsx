import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { stylesButton } from "../globalStyles/buttons.styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export const ButtonBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.canGoBack() && navigation.goBack()}
      style={{
        // backgroundColor: stylesButton.buttonsColorPrimary.backgroundColor,
        width: wp(10),
        height: wp(10),
        borderRadius: wp(100),
        padding: 0,
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 9,
      }}
    >
      <Ionicons name={"arrow-back-circle"} size={wp(10)} color={"white"} />

      {/* <Text>Hola mundo</Text> */}
    </TouchableOpacity>
  );
};
