import React, { useState } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  useWindowDimensions,
  ScrollView,
} from "react-native";
// import { DateTimePicker } from "../DateTimePicker";
// import { Input } from "../Input";
// import { Button } from "../Button";
// import { ModalComponent } from "../Modal";
import { PropsWithNavigator } from "../../types/TypesNavigator";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ModalComponent } from "../../components/Modal";
import { Background } from "../../components/Background";
import { Controller, useForm } from "react-hook-form";
import {
  SchemaRegisterContrato,
  TypeRegisterContrato,
} from "../../types/TypesContrato";
import { TextError } from "../../components/TextError";
import { TextInput } from "react-native-gesture-handler";
// import { ButtonBack } from "../ButtonBack";
import { zodResolver } from "@hookform/resolvers/zod";

import { styleAuthScreen } from "../AuthScreen";
import { useMutation } from "@tanstack/react-query";
import { addContrato } from "../../services/contratosService";
import { showToast, showToastLong } from "../../utils/toast";
import MaskInput, { TextInputMask } from "react-native-masked-input";
import { ProtectedComponent } from "../../components/ProtectedComponent";

export const ContratoScreen = ({ navigation, route }: PropsWithNavigator) => {
  const { height, width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const params = route.params as { id_cliente: string };
  const idCliente = params.id_cliente;

  const { mutate, error, data } = useMutation({
    mutationKey: ["addContrato"],
    mutationFn: addContrato,
    onSuccess: () => {
      showToastLong("Contrato registrado!");
      navigation.navigate("HomeScreen");
    },
    onError: () => {
      // console.log("ERRRORRR >> ");
      showToastLong("Ha ocurrido un error");
    },
    onMutate: () => {
      console.log("EJECUtando mutate ....");
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaRegisterContrato>({
    mode: "onChange",
    defaultValues: {
      id_cliente: idCliente,
    },
    resolver: zodResolver(TypeRegisterContrato),
  });

  console.log("DIAQWE QWE QWE>> ", idCliente);

  const onSubmit = () => {
    setShowModal(true);
  };

  const onConfirm = (data: SchemaRegisterContrato) => {
    mutate(data);
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <ButtonBack /> */}
      <ProtectedComponent permissions={["2000"]}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          behavior="height"
          style={{
            flex: 1,
            // justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
              <View
                style={{
                  height: hp(100),
                  backgroundColor: "#16213E",
                  justifyContent: "center",
                }}
              >
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
                  {/* <Input
                  text="Cantidad a Pagar (en Lempiras)"
                  numberLines={3}
                  width={wp(75)}
                  textInputSize={wp(3)}
                /> */}

                  <Controller
                    name="fechaDeInicio"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.fechaDeInicio?.message && (
                          <TextError message={errors.fechaDeInicio.message} />
                        )}
                        <TextInputMask
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Fecha de Inicio"
                          keyboardType="numeric"
                          type="datetime"
                          options={{
                            format: "DD-MM-YYYY",
                          }}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name="fechaDeFin"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.fechaDeFin?.message && (
                          <TextError message={errors.fechaDeFin.message} />
                        )}
                        <TextInputMask
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Fecha de Vencimiento"
                          keyboardType="numeric"
                          type="datetime"
                          options={{
                            format: "DD-MM-YYYY",
                          }}
                        />
                      </>
                    )}
                  />

                  {/* <Input
                  text="Fecha de Inicio"
                  numberLines={3}
                  width={wp(75)}
                  textInputSize={wp(3)}
                /> */}

                  {/* <Input
                  text="Fecha de Vencimiento"
                  numberLines={3}
                  width={wp(75)}
                  textInputSize={wp(3)}
                /> */}

                  {/* <DateTimePicker textDate="Fecha del Pago" /> */}

                  {/* <DateTimePicker textDate="Fecha de Inicio" /> */}

                  {/* <DateTimePicker textDate="Fecha de Fin" /> */}

                  <Controller
                    name="descripcion"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.descripcion?.message && (
                          <TextError message={errors.descripcion.message} />
                        )}
                        <TextInput
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Descripción (opcional)"
                          keyboardType="default"
                          numberOfLines={3}
                        />
                      </>
                    )}
                  />

                  {/* <Input
                  text="Descripcion (Opcional)"
                  numberLines={5}
                  width={wp(74)}
                  textInputSize={wp(3)}
                  marginTop={hp(5)}
                /> */}

                  {/* //! El campo de "ultimaRenovacion" se hara de manera automatica y se guardara la fecha de inicio y en casos posteriores la fecha en la que se haga el pago del contrato... */}

                  <View
                    style={{
                      marginTop: 30,
                      width: wp(75),
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      buttonType="secondary"
                      text="Cancelar"
                      width={wp(30)}
                      onPress={() => navigation.navigate("HomeScreen")}
                    />

                    <Button
                      buttonType="primary"
                      text="Aceptar"
                      onPress={handleSubmit(onSubmit)}
                      width={wp(30)}
                    />
                  </View>
                </View>

                {showModal && (
                  <ModalComponent
                    onAccept={handleSubmit(onConfirm)}
                    onCancel={onCancel}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title="Confirmación"
                    description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
                  />
                )}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ProtectedComponent>
    </>
  );
};
