import React from "react";

import { View, Text, useWindowDimensions } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  textDate?: string;
}

export const DateTimePicker = ({ textDate = "Fecha de Nacimiento" }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.75,
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          fontWeight: "500",
        }}
      >
        {textDate}
      </Text>
      <RNDateTimePicker locale="es-ES" value={new Date()} />
    </View>
  );
};
