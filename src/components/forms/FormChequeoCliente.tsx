import React from "react";

import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "../Input";
import { useWindowDimensions } from "react-native";
import { DateTimePicker } from "../DateTimePicker";
import { Button } from "../Button";
import { PropsWithNavigator } from "../../types/TypesNavigator";

export const FormChequeoCliente = ({
  navigation,
  route,
}: PropsWithNavigator) => {
  const { height, width } = useWindowDimensions();

  const onSubmit = () => {
    navigation.navigate("ContratoScreen");
  };

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
            height: height * 0.8,
            // backgroundColor: "gray",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              // backgroundColor: "red",
              textAlign: "center",
            }}
          >
            Chequeo de Cliente
          </Text>
          <Input
            text="Peso (en Kg)"
            width={width * 0.75}
            textInputSize={20}
            keyboardType="numeric"
          />

          <Input
            text="Estatura (en Mts)"
            width={width * 0.75}
            textInputSize={20}
            keyboardType="numeric"
          />

          <Input
            text="Porcentaje de Masa Muscular (en %)"
            width={width * 0.75}
            textInputSize={20}
            keyboardType="numeric"
          />

          <Input
            text="Porcentaje de Grasa (en %)"
            width={width * 0.75}
            textInputSize={20}
            keyboardType="numeric"
          />

          <DateTimePicker textDate="Fecha del Chequeo" />

          <View
            style={{
              marginTop: 30,
              width: width * 0.75,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button buttonType="secondary" text="Cancelar" width={100} />
            <Button
              buttonType="primary"
              text="Siguiente"
              onPress={onSubmit}
              width={120}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
