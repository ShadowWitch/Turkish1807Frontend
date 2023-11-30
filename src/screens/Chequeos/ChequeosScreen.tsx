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
import {
  SchemaRegisterChequeo,
  TypeRegisterChequeo,
} from "../../types/TypesChequeo";
import { registrarChequeoService } from "../../services/chequeoService";

import MaskInput from "react-native-masked-input";
import { ProtectedComponent } from "../../components/ProtectedComponent";

export const ChequeosScreen = ({ navigation, route }: PropsWithNavigator) => {
  const { height, width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const params = route.params as { id_cliente: string };
  const idCliente = params.id_cliente;

  const { mutate, error, data } = useMutation({
    mutationKey: ["registrarChequeoService"],
    mutationFn: registrarChequeoService,
    onSuccess: () => {
      showToastLong("Chequeo registrado!");
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

  console.log("ID CLIENTE >> ", idCliente);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaRegisterChequeo>({
    mode: "onChange",
    defaultValues: {
      id_cliente: idCliente,
    },
    resolver: zodResolver(TypeRegisterChequeo),
  });

  const onSubmit = () => {
    setShowModal(true);
  };

  const onConfirm = (data: SchemaRegisterChequeo) => {
    console.log("DADA >> ", JSON.stringify(data, null, 3));
    mutate(data);
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <ButtonBack /> */}
      <ProtectedComponent permissions={["1005"]}>
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
                  Nuevo Chequeo
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: hp(60),
                    // backgroundColor: "gray",
                  }}
                >
                  <Controller
                    name="estatura"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "La estatura es requerida.",
                      },
                      // minLength: {
                      //   value: 3,
                      //   message: "Estatura no valida",
                      // },
                      // maxLength: {
                      //   value: 3,
                      //   message: "Estatura no valida",
                      // },

                      // pattern: {
                      //   value: regexPatterEstatura,
                      //   message: "Formato no valido",
                      // },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.estatura?.message && (
                          <TextError message={errors.estatura.message} />
                        )}
                        <MaskInput
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Estatura (En Mts)"
                          keyboardType="number-pad"
                          type={"money"}
                          options={{
                            precision: 2, // número de decimales permitidos
                            separator: ".", // separador de decimales
                            delimiter: ",", // separador de miles
                            unit: "", // unidad antes del número (puede ser vacío)
                            suffixUnit: "", // unidad después del número (puede ser vacío)
                          }}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name="peso"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "El peso es requerida.",
                      },

                      // pattern: {
                      //   value: regexPatternPeso,
                      //   message: "Formato no valido",
                      // },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.peso?.message && (
                          <TextError message={errors.peso.message} />
                        )}
                        <MaskInput
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Peso (En Kg)"
                          keyboardType="number-pad"
                          type={"money"}
                          options={{
                            precision: 2, // número de decimales permitidos
                            separator: ".", // separador de decimales
                            delimiter: ",", // separador de miles
                            unit: "", // unidad antes del número (puede ser vacío)
                            suffixUnit: "", // unidad después del número (puede ser vacío)
                          }}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name="nivelDeGrasa"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "% de grasa requerido.",
                      },

                      // pattern: {
                      //   value: regexPatternGrasaMasa,
                      //   message: "Formato no valido",
                      // },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.nivelDeGrasa?.message && (
                          <TextError message={errors.nivelDeGrasa.message} />
                        )}
                        <MaskInput
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Nivel de grasa (%)"
                          keyboardType="number-pad"
                          type={"money"}
                          options={{
                            precision: 2, // número de decimales permitidos
                            separator: ".", // separador de decimales
                            delimiter: ",", // separador de miles
                            unit: "", // unidad antes del número (puede ser vacío)
                            suffixUnit: "", // unidad después del número (puede ser vacío)
                          }}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name="nivelDeMasa"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "% de masa requerido.",
                      },

                      // pattern: {
                      //   value: regexPatternGrasaMasa,
                      //   message: "Formato no valido",
                      // },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {errors.nivelDeMasa?.message && (
                          <TextError message={errors.nivelDeMasa.message} />
                        )}
                        <MaskInput
                          style={{
                            ...styleAuthScreen.inputForm,
                            width: wp(80),
                          }}
                          onBlur={onBlur}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          placeholder="Nivel de masa (%)"
                          keyboardType="number-pad"
                          type={"money"}
                          options={{
                            precision: 1, // número de decimales permitidos
                            separator: ".", // separador de decimales
                            delimiter: ",", // separador de miles
                            unit: "", // unidad antes del número (puede ser vacío)
                            suffixUnit: "", // unidad después del número (puede ser vacío)
                          }}
                        />
                      </>
                    )}
                  />
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
