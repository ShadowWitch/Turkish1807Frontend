import React from "react";

import { View, Text, useWindowDimensions } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  textDate?: string;
}

export const DateTimePicker = ({ textDate = "Fecha de Nacimiento" }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: wp(3),
        height: hp(5),
        justifyContent: "center",
        alignItems: "center",
        width: wp(75),
        flexDirection: "row",
        marginTop: hp(2),
      }}
    >
      <Text
        style={{
          // marginBottom: hp(),
          fontWeight: "500",
        }}
      >
        {textDate}
      </Text>
      <RNDateTimePicker locale="es-ES" value={new Date()} />
    </View>
  );
};
