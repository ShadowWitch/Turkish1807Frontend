import React from "react";

import {
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text,
} from "react-native";
import { Input } from "../Input";
import { Select } from "../Select";
import { ImagePickerComponent } from "../ImagePickerComponent";
import { Button } from "../Button";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const FormCrearEjercicio = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <TouchableWithoutFeedback
        style={{ borderColor: " green" }}
        onPress={() => Keyboard.dismiss()}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            height: hp(75),
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: wp(8),
              // backgroundColor: "red",
              textAlign: "center",
            }}
          >
            Registrar Ejercicio
          </Text>

          <Input
            text="Nombre del Ejercicio"
            width={wp(75)}
            textInputSize={wp(3)}
          />
          <Input text="Descripcion" width={wp(75)} textInputSize={wp(3)} />
          <Select width={wp(75)} text="Seleccione una opción" />

          <ImagePickerComponent width={wp(75)} />

          <View
            style={{
              //   backgroundColor: "red",
              marginTop: hp(5),
              width: wp(75),
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button buttonType="secondary" text="Cancelar" width={wp(30)} />
            <Button buttonType="primary" text="Aceptar" width={wp(30)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
