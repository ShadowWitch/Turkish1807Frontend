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
import { DateTimePicker } from "../DateTimePicker";
import { Button } from "../Button";
import { PropsWithNavigator } from "../../types/TypesNavigator";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../ButtonBack";

export const FormChequeoCliente = ({
  navigation,
  route,
}: PropsWithNavigator) => {
  const onSubmit = () => {
    navigation.navigate("ContratoScreen");
  };

  return (
    <>
      <ButtonBack />
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
              height: hp(80),
              // backgroundColor: "gray",
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
              Chequeo de Cliente
            </Text>
            <Input
              text="Peso (en Kg)"
              width={wp(75)}
              textInputSize={wp(3)}
              keyboardType="numeric"
            />

            <Input
              text="Estatura (en Mts)"
              width={wp(75)}
              textInputSize={wp(3)}
              keyboardType="numeric"
            />

            <Input
              text="Porcentaje de Masa Muscular (en %)"
              width={wp(75)}
              textInputSize={wp(3)}
              keyboardType="numeric"
            />

            <Input
              text="Porcentaje de Grasa (en %)"
              width={wp(75)}
              textInputSize={wp(3)}
              keyboardType="numeric"
            />

            <DateTimePicker textDate="Fecha del Chequeo" />

            <View
              style={{
                marginTop: hp(1),
                width: wp(75),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button buttonType="secondary" text="Cancelar" width={wp(30)} />
              <Button
                buttonType="primary"
                text="Siguiente"
                onPress={onSubmit}
                width={wp(30)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
