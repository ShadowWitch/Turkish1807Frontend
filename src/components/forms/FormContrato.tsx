import React, { useState } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { DateTimePicker } from "../DateTimePicker";
import { Input } from "../Input";
import { Button } from "../Button";
import { ModalComponent } from "../Modal";
import { PropsWithNavigator } from "../../types/TypesNavigator";

export const FormContrato = ({ navigation, route }: PropsWithNavigator) => {
  const { height, width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = () => {
    console.log("qweqwe");
    setShowModal(true);
  };

  const onConfirm = () => {
    console.log("HOLA mundo");
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        // backgroundColor: "green",
      }}
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
              height: height * 0.6,
              //   backgroundColor: "gray",
            }}
          >
            <Input
              text="Cantidad a Pagar (en Lempiras)"
              numberLines={3}
              width={width * 0.75}
              textInputSize={20}
            />

            <DateTimePicker textDate="Fecha del Pago" />

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
              <Button buttonType="secondary" text="Cancelar" width={100} />

              <Button
                buttonType="primary"
                text="Aceptar"
                onPress={onSubmit}
                width={100}
              />
            </View>
          </View>

          {showModal && (
            <ModalComponent
              onAccept={onConfirm}
              onCancel={onCancel}
              showModal={showModal}
              setShowModal={setShowModal}
              title="Confirmación"
              description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
            />
          )}
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
