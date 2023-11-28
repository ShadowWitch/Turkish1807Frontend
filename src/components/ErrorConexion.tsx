import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/core";
export const ErrorConexion = () => {
  const navigator = useNavigation();

  return (
    <View
      style={{
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: hp(5),
        }}
      >
        <Ionicons
          style={{
            marginHorizontal: wp(2),
          }}
          name={"cloud-offline-outline"}
          size={wp(7)}
          color={"white"}
        />
        <Text
          style={{
            color: "white",
            fontSize: wp(5),
          }}
        >
          Error de conexión
        </Text>
      </View>

      <Button
        buttonType="secondary"
        text="Regresar"
        onPress={() => navigator.goBack()}
      />
    </View>
  );
};
