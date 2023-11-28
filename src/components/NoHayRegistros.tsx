import React from "react";

import { View, Text } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const NoHayRegistros = () => {
  return (
    <View
      style={{
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: wp(5),
        }}
      >
        No hay registros.
      </Text>
    </View>
  );
};
