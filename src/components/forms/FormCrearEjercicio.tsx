import React from "react";

import {
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Input } from "../Input";
import { Select } from "../Select";
import { ImagePickerComponent } from "../ImagePickerComponent";
import { Button } from "../Button";

export const FormCrearEjercicio = () => {
  const { height, width } = useWindowDimensions();

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
            height: height * 0.5,
          }}
        >
          <Input
            text="Nombre del Ejercicio"
            width={width * 0.75}
            textInputSize={20}
          />
          <Input text="Descripcion" width={width * 0.75} textInputSize={20} />
          <Select width={width * 0.75} text="Seleccione una opción" />

          <ImagePickerComponent width={width * 0.75} />

          <View
            style={{
              //   backgroundColor: "red",
              marginTop: 30,
              width: width * 0.75,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button buttonType="primary" text="Aceptar" width={100} />
            <Button buttonType="secondary" text="Cancelar" width={100} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
