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
// import { Button } from "../../components/Button";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { useMutation, useQuery } from "@tanstack/react-query";
import MaskInput from "react-native-masked-input";
import { createNumberMask } from "react-native-mask-input";
import { ModalComponent } from "../components/Modal";
import { TextError } from "../components/TextError";
import { Button } from "../components/Button";
import { ButtonBack } from "../components/ButtonBack";
import { getUsuario, updateEmailOrUser } from "../services/usuariosService";
import { showToastLong } from "../utils/toast";
import { useAuth } from "../context/AuthContext";
import { styleAuthScreen } from "./RegistrarUsuarioScreen";
import { SchemaUpdateUser, TypeUpdateUsuario } from "../types/TypeRegisterUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalContrasena } from "../components/ModalContrasena";

interface Props extends StackScreenProps<any, any> {}

export const PerfilScreen = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalContrasena, setShowModalContrasena] = useState(false);

  const { setIsAuthenticated, user } = useAuth();

  const { mutate, error, data } = useMutation({
    mutationKey: ["updateEmailOrUser"],
    mutationFn: updateEmailOrUser,
    onSuccess: (data) => {
      showToastLong("Usuario actualizado");
      setShowModal(false);
    },
    onError: (err: any) => {
      showToastLong("Error al actualizar usuario");
    },
    onMutate: () => {},
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaUpdateUser>({
    mode: "onChange",
    defaultValues: {
      id: user?.id,
      nombre: user?.nombre,
      correoElectronico: user?.correoElectronico,
    },
    resolver: zodResolver(TypeUpdateUsuario),
  });

  const onConfirm = (data: SchemaUpdateUser) => {
    console.log("DATA >> ", JSON.stringify(data, null, 3));
    mutate(data);
  };
  const onCancelContrasena = () => {
    setShowModalContrasena(false);
  };

  const onSubmitContrasena = () => {
    setShowModalContrasena(true);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    setShowModal(true);
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
                Datos del Usuario
              </Text>

              <View>
                <Text style={styleAuthScreen.textInputForm}>Usuario</Text>

                <Controller
                  name="nombre"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        style={{ ...styleAuthScreen.inputForm, width: wp(90) }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Ingrese un usuario"
                      />
                      {errors.nombre?.message && (
                        <TextError message={errors.nombre.message} />
                      )}
                    </>
                  )}
                />
              </View>
              <View>
                <Text style={styleAuthScreen.textInputForm}>
                  Correo Electrónico
                </Text>

                <Controller
                  name="correoElectronico"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        style={{ ...styleAuthScreen.inputForm, width: wp(90) }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Ingrese un email"
                      />
                      {errors.correoElectronico?.message && (
                        <TextError message={errors.correoElectronico.message} />
                      )}
                    </>
                  )}
                />
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
                  text="Aceptar"
                  onPress={onSubmit}
                  width={wp(30)}
                />
              </View>

              <Button
                buttonType="primary"
                text="Cambiar contraseña"
                onPress={onSubmitContrasena}
                width={wp(50)}
              />
              {showModal && (
                <ModalComponent
                  onAccept={handleSubmit(onConfirm)}
                  onCancel={onCancel}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  title="Cliente registrado con exito"
                  description="Se ha registrado un cliente"
                />
              )}

              {showModalContrasena && (
                <ModalContrasena
                  id_usuario={user!.id}
                  setShowModal={setShowModalContrasena}
                  acceptText="Confirmar"
                  cancelText="Cancelar"
                  description="Esta seguro que desea cambiar la contraseña del usuario?"
                  onCancel={onCancel}
                  showModal={showModalContrasena}
                  title="Cambio de contraseña"
                />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
