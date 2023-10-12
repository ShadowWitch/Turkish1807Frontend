import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

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
  size = 45,
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
    height: 100,
    marginTop: 20,
    borderRadius: 30,

    alignItems: "center",
    display: "flex",
    flexDirection: "column",

    //* Shadows
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
  },

  itemText: {
    fontSize: 30,
    // fontFamily: "Open Sans",
  },
});
