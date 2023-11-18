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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../ButtonBack";

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
    <>
      <ButtonBack />
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
                fontSize: wp(8),
                // backgroundColor: "red",
                textAlign: "center",
                marginBottom: hp(3),
              }}
            >
              Registrar Contrato
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                height: hp(60),
                // backgroundColor: "gray",
              }}
            >
              <Input
                text="Cantidad a Pagar (en Lempiras)"
                numberLines={3}
                width={wp(75)}
                textInputSize={wp(3)}
              />

              <DateTimePicker textDate="Fecha del Pago" />

              <DateTimePicker textDate="Fecha de Inicio" />

              <DateTimePicker textDate="Fecha de Fin" />

              <Input
                text="Descripcion (Opcional)"
                numberLines={5}
                width={wp(74)}
                textInputSize={wp(3)}
                marginTop={hp(5)}
              />

              {/* //! El campo de "ultimaRenovacion" se hara de manera automatica y se guardara la fecha de inicio y en casos posteriores la fecha en la que se haga el pago del contrato... */}

              <View
                style={{
                  marginTop: 30,
                  width: wp(75),
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button buttonType="secondary" text="Cancelar" width={wp(30)} />

                <Button
                  buttonType="primary"
                  text="Aceptar"
                  onPress={onSubmit}
                  width={wp(30)}
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
    </>
  );
};
