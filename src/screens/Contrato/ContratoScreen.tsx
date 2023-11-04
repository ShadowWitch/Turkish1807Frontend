import React from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { Background } from "../../components/Background";
import { Input } from "../../components/Input";
import { DateTimePicker } from "../../components/DateTimePicker";
import { Button } from "../../components/Button";

export const ContratoScreen = () => {
  const { height, width } = useWindowDimensions();

  const onSubmit = () => {
    console.log("qweqwe");
  };

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <TouchableWithoutFeedback
          style={{ borderColor: " green" }}
          onPress={() => Keyboard.dismiss()}
        >
          <>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                // backgroundColor: "red",
                textAlign: "center",
              }}
            >
              Registrar Contrato
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                height: height * 0.4,
                // backgroundColor: "gray",
              }}
            >
              <DateTimePicker textDate="Fecha de Inicio" />

              <DateTimePicker textDate="Fecha de Fin" />

              <Input
                text="Descripcion (Opcional)"
                numberLines={3}
                width={width * 0.75}
                textInputSize={20}
              />

              {/* //! El campo de "ultimaRenovacion" se hara de manera automatica y se guardara la fecha de inicio y en casos posteriores la fecha en la que se haga el pago del contrato... */}

              <View
                style={{
                  marginTop: 30,
                  width: width * 0.75,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  buttonType="primary"
                  text="Aceptar"
                  onPress={onSubmit}
                  width={100}
                />
                <Button buttonType="secondary" text="Cancelar" width={100} />
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
};
