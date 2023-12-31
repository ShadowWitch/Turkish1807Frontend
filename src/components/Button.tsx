import React from "react";

import { View, TouchableOpacity, Text } from "react-native";
import { stylesButton } from "../globalStyles/buttons.styles";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
interface Props {
  text: string;
  width?: number;
  height?: number;

  buttonType: "primary" | "secondary";

  onPress?: () => void;
}

export const Button = ({
  buttonType,
  text = "N/A",
  height,
  width = 100,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor:
          buttonType === "primary"
            ? stylesButton.buttonsColorPrimary.backgroundColor
            : stylesButton.buttonsColorSecondary.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: width,
        justifyContent: "center",
        alignItems: "center",

        //   Shadows
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}
    >
      <Text
        style={{
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
