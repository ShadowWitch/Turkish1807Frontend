import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

interface Props {
  width: number;
  text: string;
  textSize?: number;
  textColor?: string;
  background?: string;
}

export const Select = ({
  text = "example",
  width = 10,
  textColor = "white",
  textSize,
  background = "white",
}: Props) => {
  const pruebaArr = [
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
    "a",
    "b",
    "c",
  ];
  const [selectedItem, setSelectedItem] = useState(pruebaArr[0]);

  return (
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

      <ModalDropdown
        style={{
          backgroundColor: background,
          //   padding: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
          height: 40,
          borderRadius: 10,
        }}
        options={pruebaArr}
        defaultValue={selectedItem}
        onSelect={setSelectedItem}
        dropdownStyle={{
          width: width,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 8,
          backgroundColor: "white",
        }}
        dropdownTextStyle={{
          color: "red",
          borderColor: "black",
          paddingVertical: 15,
          fontSize: 20,
        }}
        // dropdownListProps={{
        //   borderColor: "black",
        //   borderBottomColor: "black",
        // }}
      />
    </View>
  );
};
