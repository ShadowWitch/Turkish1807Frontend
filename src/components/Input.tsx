import React from "react";

import { View, Text, TextInput, StyleSheet, KeyboardType } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  // Text
  text: string;
  textSize?: number;
  textColor?: string;

  // Text Input
  placeholder?: string;
  textInputColor?: string;
  textInputSize?: number;

  width: number;

  numberLines?: number;

  keyboardType?: KeyboardType;
}

export const Input = ({
  text = "example",
  textSize,
  textColor = "white",
  placeholder,
  textInputSize,
  textInputColor = "black",
  width = wp(3),
  numberLines,

  keyboardType = "default",
}: Props) => {
  return (
    <>
      <View
        style={{
          width: width,
        }}
      >
        <Text
          style={{
            fontSize: textSize,
            color: textColor,
            marginBottom: 5,
            fontWeight: "500",
          }}
        >
          {text}
        </Text>
        <View style={styleComponentInput.backgroundInput}>
          <TextInput
            placeholder={placeholder}
            style={{
              fontSize: textInputSize,
              color: textInputColor,
            }}
            multiline={numberLines ? true : false}
            numberOfLines={numberLines && numberLines}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    </>
  );
};

const styleComponentInput = StyleSheet.create({
  backgroundInput: {
    backgroundColor: "white",
    borderRadius: 10,
    // height: 40,
    minHeight: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
