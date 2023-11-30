import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  TextInput,
} from "react-native";
import { Background } from "../../components/Background";
import { Button } from "../../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../../components/ButtonBack";
import { TouchableWithoutFeedback } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextError } from "../../components/TextError";
import MaskInput from "react-native-mask-input";
import { ModalComponent } from "../../components/Modal";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";
import { styleAuthScreen } from "../AuthScreen";
import {
  SchemaRegisterRutina,
  TypeRegisterRutina,
} from "../../types/TypesRutinasEjercicios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registrarRutinaService } from "../../services/rutinasEjerciciosService";
import { showToastLong } from "../../utils/toast";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const RutinasScreen = ({ navigation, route }: Props) => {
  const { mutate, error, data } = useMutation({
    mutationKey: ["registrarRutinaService"],
    mutationFn: registrarRutinaService,
    onSuccess: (data) => {
      console.log("DATA >> ", data);
      showToastLong("Rutina registrada con exito!");

      navigation.navigate("HomeScreen");
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
  } = useForm<SchemaRegisterRutina>({
    mode: "onChange",
    resolver: zodResolver(TypeRegisterRutina),
  });

  const onSubmit = (data: SchemaRegisterRutina) => {
    console.log("DATA >> ", JSON.stringify(data, null, 3));
    console.log("qweqwe");
    mutate(data);
  };

  return (
    <>
      <ButtonBack />
      <KeyboardAvoidingView
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
                Registrar Rutina
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
                  name="nombre"
                  control={control}
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
                        placeholder="Nombre de la rutina"
                        keyboardType="default"
                      />
                    </>
                  )}
                />

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

              {/* {showModal && (
                <ModalComponent
                  onAccept={handleSubmit(onConfirm)}
                  onCancel={onCancel}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  title="Confirmación"
                  description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
                />
              )} */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
