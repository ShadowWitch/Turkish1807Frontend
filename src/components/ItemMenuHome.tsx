import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface IProps {
  url: string;
  text: string;
  icon: string;
  size?: number;
  colorIcon?: string;
}

export const ItemMenuHome = ({
  icon,
  url,
  text,
  colorIcon = "#E94560",
  size = wp(10),
}: IProps) => {
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.itemsStyle}
      onPress={() => navigator.navigate(url as never)}
    >
      <Ionicons name={icon as any} size={size} color={colorIcon} />
      <Text style={style.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  itemsStyle: {
    backgroundColor: "#0F3460",
    // height: hp(10),
    marginTop: hp(2),
    borderRadius: 5,
    paddingVertical: hp(1),

    alignItems: "center",
    display: "flex",
    flexDirection: "column",

    //* Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  itemText: {
    fontSize: wp(7),
    color: "white",
    // fontFamily: "Open Sans",
  },
});
