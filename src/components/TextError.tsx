import React from "react";
import { FieldError } from "react-hook-form";
import { Text } from "react-native";

// interface Props {
//   error: string;
//   data: {
//     type: string;
//     message: string;
//     ref: {
//       name: string;
//     };
//   };
// }

interface Prop {
  message: string;
}

export const TextError = ({ message }: Prop) => {
  return (
    <Text
      style={{
        color: "#f99292",
        fontSize: 10,
        top: 2,
        zIndex: 999,
      }}
    >
      {message}
    </Text>
  );
};
