import React, { useState } from "react";
import { useWindowDimensions } from "react-native";

import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
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
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { styleAuthScreen } from "../AuthScreen";
import { TextError } from "../../components/TextError";
import { SelectInput } from "../../components/SelectInput";
import { SchemaRegisterCliente } from "../../types/TypesClientes";
import { registrarClienteService } from "../../services/clientesService";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../../components/Toast";
import { CreateToast } from "../../utils/toast";
import { ModalComponent } from "../../components/Modal";
import { useNavigation } from "@react-navigation/native";
import MaskInput from "react-native-masked-input";
import { createNumberMask } from "react-native-mask-input";
import { ProtectedComponent } from "../../components/ProtectedComponent";

interface Props extends StackScreenProps<TypesNavigator, any> {}

interface IValue {
  label: string;
  value: string | number;
  id: number;
}

// const listaMunicipios: IValue[] = [
//   {
//     label: "Test 1",
//     value: "1",
//     id: 1,
//   },
//   {
//     label: "Test 2",
//     value: "2",
//     id: 2,
//   },
//   {
//     label: "Test 3",
//     value: "3",
//     id: 3,
//   },
// ];

const mascara = createNumberMask({
  delimiter: ",",
  separator: ".",
  precision: 2,
});

const regexPattern = /^[0-9]{2}\.[0-9]$/; // Expresión regular para 2 números y un decimal
const regexPatternPeso = /^[0-9]{3}\.[0-9]$/; // Expresión regular para 2 números y un decimal
const regexPatternGrasaMasa = /^(100|[1-9][0-9]?)$/; // Expresión regular para 2 números y un decimal
const regexPatterEstatura = /^\d+(\.\d{2})?$/;

export const RegistrarClientesScreen = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const onConfirm = () => {
    setShowModal(false);
    navigation.navigate("HomeScreen");
  };

  const { mutate, error, data } = useMutation({
    mutationKey: ["registrarClienteService"],
    mutationFn: registrarClienteService,
    onSuccess: (data) => {
      console.log("DATA >> ", data);
      if (data) {
        setShowModal(true);
      }
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
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
  } = useForm<SchemaRegisterCliente>({
    mode: "onChange",
  });

  const onSubmit = (data: SchemaRegisterCliente) => {
    console.log("qweqwe");
    mutate(data);
  };

  return (
    // <Background marginTop={hp(10)}>
    <>
      <ButtonBack />
      <ProtectedComponent permissions={["1001"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <TouchableWithoutFeedback
            style={{ borderColor: "green" }}
            onPress={() => Keyboard.dismiss()}
          >
            <ScrollView>
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
                {/* <Input text="DNI (opcional)" width={wp(75)} textInputSize={wp(3)} /> */}

                <Controller
                  name="DNI"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "El DNI es requerido.",
                    },
                    minLength: {
                      value: 13,
                      message: "DNI no valido",
                    },
                    maxLength: {
                      value: 13,
                      message: "DNI no valido",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.DNI?.message && (
                        <TextError message={errors.DNI.message} />
                      )}
                      <MaskInput
                        style={{
                          ...styleAuthScreen.inputForm,
                          width: wp(80),
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="DNI (opcional)"
                        keyboardType="number-pad"
                        type="custom"
                        options={{
                          mask: "9999999999999", // Define la máscara que especifica el formato deseado
                        }}
                      />
                    </>
                  )}
                />

                <Controller
                  name="nombreCompleto"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "El nombre completo es requerido.",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "El nombre completo debe tener minimo de 8 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El nombre completo debe tener máximo 50 caracteres.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.nombreCompleto?.message && (
                        <TextError message={errors.nombreCompleto.message} />
                      )}
                      <TextInput
                        style={{ ...styleAuthScreen.inputForm, width: wp(80) }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Nombre Completo"
                      />
                    </>
                  )}
                />

                {/* <DateTimePicker textDate="Fecha de Nacimiento" /> */}

                <Controller
                  name="telefono"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "El telefono es requerido.",
                    },
                    minLength: {
                      value: 8,
                      message: "El telefono debe tener minimo de 8 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "El telefono debe tener máximo 20 caracteres.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.telefono?.message && (
                        <TextError message={errors.telefono.message} />
                      )}
                      <MaskInput
                        style={{ ...styleAuthScreen.inputForm, width: wp(80) }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Telefono"
                        keyboardType="phone-pad"
                        type="custom"
                        options={{
                          mask: "+504 99999999", // Define la máscara que especifica el formato deseado
                        }}
                      />
                    </>
                  )}
                />

                {/* <Controller
              name={"id_municipio"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El Tipo de Documento es requerido.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label="Municipio"
                  options={listaMunicipios}
                  value={value}
                  onChange={onChange}
                  error={{ message: errors.id_municipio?.message || "" }}
                />
              )}
            /> */}

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
                    marginTop: hp(5),
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
                    text="Siguiente"
                    onPress={handleSubmit(onSubmit)}
                    width={wp(30)}
                  />
                </View>
                {showModal && (
                  <ModalComponent
                    onAccept={onConfirm}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title="Cliente registrado con exito"
                    description="Se ha registrado un cliente"
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
