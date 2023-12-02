import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Toast } from "../../components/Toast";
import { CreateToast, showToastLong } from "../../utils/toast";
import { ModalComponent } from "../../components/Modal";
import { useNavigation } from "@react-navigation/native";
import MaskInput from "react-native-masked-input";
import { createNumberMask } from "react-native-mask-input";
import { SchemaRegisterRol } from "../../types/TypeRoles";
import {
  listaPermisos,
  registrarRol,
} from "../../services/rolesPermisosService";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { stylesButton } from "../../globalStyles/buttons.styles";

interface Props extends StackScreenProps<TypesNavigator, any> {}

interface IValue {
  label: string;
  value: string | number;
  id: number;
}

export const RegistrarRolScreen = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<string[]>(
    []
  );

  const {
    data: dataListaPermisos,
    error: errorListaPermisos,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaPermisos"],
    queryFn: listaPermisos,
  });

  const onConfirm = () => {
    setShowModal(false);
    navigation.navigate("HomeScreen");
  };

  const { mutate, error, data } = useMutation({
    mutationKey: ["registrarRol"],
    mutationFn: registrarRol,
    onSuccess: (data) => {
      showToastLong("Rol registrado con exito!");
      navigation.navigate("HomeScreen");
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      console.log("Error al registrar el rol");
    },
    onMutate: () => {},
  });

  const prueba = () => {
    console.log("OQWEQWEQWEQEQWEWQE");
  };

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaRegisterRol>({
    mode: "onChange",
  });

  const onSubmit = (data: SchemaRegisterRol) => {
    const sendData = {
      ...data,
      permisos: permisosSeleccionados,
    };

    mutate(sendData);
  };

  useEffect(() => {
    refetch();
  }, []);

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
                Datos del Rol
              </Text>

              <Controller
                name="nombre"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El nombre del rol es requerido.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener minimo 3 caracteres",
                  },
                  maxLength: {
                    value: 10,
                    message: "Este campo debe tener máximo 10 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    {errors.nombre?.message && (
                      <TextError message={errors.nombre.message} />
                    )}
                    <TextInput
                      style={{
                        ...styleAuthScreen.inputForm,
                        width: wp(80),
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Nombre del Rol"
                      keyboardType="default"
                    />
                  </>
                )}
              />

              <Controller
                name="descripcion"
                control={control}
                rules={{
                  minLength: {
                    value: 5,
                    message: "Este campo debe tener minimo 5 caracteres",
                  },
                  maxLength: {
                    value: 13,
                    message: "Este campo debe tener maximo 13 caracteres",
                  },
                }}
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
                    />
                  </>
                )}
              />

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    justifyContent: "flex-start",
                    marginRight: wp(7),
                  }}
                >
                  {dataListaPermisos?.map(
                    (e, index) =>
                      index <= 6 && (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: hp(1.3),
                          }}
                          onPress={() =>
                            permisosSeleccionados.includes(e.id)
                              ? setPermisosSeleccionados(
                                  permisosSeleccionados.filter(
                                    (item) => item !== e.id
                                  )
                                )
                              : setPermisosSeleccionados([
                                  ...permisosSeleccionados,
                                  e.id,
                                ])
                          }
                        >
                          <Ionicons
                            name={
                              permisosSeleccionados.includes(e.id)
                                ? "remove-outline"
                                : "add-outline"
                            }
                            size={wp(5)}
                            color={
                              permisosSeleccionados.includes(e.id)
                                ? stylesButton.buttonsColorPrimary
                                    .backgroundColor
                                : stylesButton.buttonsColorSecondary
                                    .backgroundColor
                            }
                          />

                          <Text
                            style={{
                              color: permisosSeleccionados.includes(e.id)
                                ? stylesButton.buttonsColorPrimary
                                    .backgroundColor
                                : stylesButton.buttonsColorSecondary
                                    .backgroundColor,
                              fontSize: wp(4),
                            }}
                          >
                            {e.nombre}
                          </Text>
                        </TouchableOpacity>
                      )
                  )}
                </View>

                <View
                  style={{
                    justifyContent: "flex-start",
                  }}
                >
                  {dataListaPermisos?.map(
                    (e, index) =>
                      index > 6 && (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: hp(1.3),
                          }}
                          onPress={() =>
                            permisosSeleccionados.includes(e.id)
                              ? setPermisosSeleccionados(
                                  permisosSeleccionados.filter(
                                    (item) => item !== e.id
                                  )
                                )
                              : setPermisosSeleccionados([
                                  ...permisosSeleccionados,
                                  e.id,
                                ])
                          }
                        >
                          <Ionicons
                            name={
                              permisosSeleccionados.includes(e.id)
                                ? "remove-outline"
                                : "add-outline"
                            }
                            size={wp(5)}
                            color={
                              permisosSeleccionados.includes(e.id)
                                ? stylesButton.buttonsColorPrimary
                                    .backgroundColor
                                : stylesButton.buttonsColorSecondary
                                    .backgroundColor
                            }
                          />

                          <Text
                            style={{
                              color: permisosSeleccionados.includes(e.id)
                                ? stylesButton.buttonsColorPrimary
                                    .backgroundColor
                                : stylesButton.buttonsColorSecondary
                                    .backgroundColor,
                              fontSize: wp(4),
                            }}
                          >
                            {e.nombre}
                          </Text>
                        </TouchableOpacity>
                      )
                  )}
                </View>
              </View>

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
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "white",
  },
  checkbox: {
    margin: 8,
  },
});
