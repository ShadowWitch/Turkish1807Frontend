import React from "react";
import { useWindowDimensions } from "react-native";

import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";
import { Input } from "../../components/Input";
import { DateTimePicker } from "../../components/DateTimePicker";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Background } from "../../components/Background";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../../components/ButtonBack";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const RegistrarClientesScreen = ({ navigation, route }: Props) => {
  const onAceptar = () => {
    navigation.navigate("ChequeosScreen");
  };

  return (
    // <Background marginTop={hp(10)}>
    <>
      <ButtonBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <TouchableWithoutFeedback
          style={{ borderColor: "green" }}
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
                fontSize: wp(7),
                // backgroundColor: "red",
                textAlign: "center",
              }}
            >
              Datos del Cliente
            </Text>
            <Input text="DNI (opcional)" width={wp(75)} textInputSize={wp(3)} />
            <Input
              text="Nombre Completo"
              width={wp(75)}
              textInputSize={wp(3)}
            />

            <DateTimePicker textDate="Fecha de Nacimiento" />

            <Input text="Telefono" width={wp(75)} textInputSize={wp(3)} />
            {/* <Input text="Correo (opcional)" width={wp(75)} textInputSize={20} /> */}
            {/* <Input
            text="Direccion (opcional)"
            width={wp(75)}
            textInputSize={wp(3)}
          /> */}

            <Select text="Municipio" width={wp(75)} />

            <View
              style={{
                marginTop: hp(5),
                width: wp(75),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button buttonType="secondary" text="Cancelar" width={wp(30)} />
              <Button
                buttonType="primary"
                text="Siguiente"
                onPress={onAceptar}
                width={wp(30)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
