import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Image } from "expo-image";
import { stylesButton } from "../globalStyles/buttons.styles";
import { TextError } from "../components/TextError";
import {
  SchemaLogin,
  SchemaRecuperarContrasena,
  TypeRecuperarContrasena,
} from "../types/TypesAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAuth, recuperarContrasena, signIn } from "../services/auth";
import { SaveStorage } from "../storage/Storage";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { showToastLong } from "../utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";

export const RecuperarContrasenaScreen = () => {
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();

  const { mutate, error, data } = useMutation({
    mutationKey: ["recuperarContrasena"],
    mutationFn: recuperarContrasena,
    onSuccess: () => {
      showToastLong("Email enviado");
      navigation.navigate("AuthScreen");
    },
    onError: (err) => {
      console.log(err);
      showToastLong("Error al enviar email");
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
  } = useForm<SchemaRecuperarContrasena>({
    mode: "onChange",
    resolver: zodResolver(TypeRecuperarContrasena),
  });

  const onSubmit = (data: SchemaRecuperarContrasena) => {
    mutate(data);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ ...styleAuthScreen.background }}>
          <Image
            style={{
              height: hp(25),
              width: wp(100),
              marginBottom: hp(5),
            }}
            source={require("../../assets/gym.png")}
            contentFit="scale-down"
            transition={1000}
          />

          <View
            style={{
              ...styleAuthScreen.form,
              height: hp(45),
              width: wp(70),
            }}
          >
            <View style={styleAuthScreen.componentInputs}>
              <Text style={styleAuthScreen.textInputForm}>
                Correo Electrónico
              </Text>

              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styleAuthScreen.inputForm}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Ingrese su email"
                    />
                    {errors.email?.message && (
                      <TextError message={errors.email.message} />
                    )}
                  </>
                )}
              />
            </View>

            <View
              style={{
                ...styleAuthScreen.componentInputs,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
              >
                <View style={styleAuthScreen.buttonForm}>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Recuperar Contraseña
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                textAlign: "center",
                color: "white",
                marginTop: hp(5),
                // fontStyle: "italic",
              }}
            >
              Aun no tienes una cuenta?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegistrarUsuarioScreen")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: hp(1),
                  fontStyle: "italic",
                }}
              >
                Registrarse
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("AuthScreen")}
              style={{
                marginTop: hp(3),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: hp(1),
                  fontStyle: "italic",
                }}
              >
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export const styleAuthScreen = StyleSheet.create({
  background: {
    backgroundColor: "#16213E",
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    // backgroundColor: "red",
    justifyContent: "center",
    flexDirection: "column",
  },

  inputForm: {
    backgroundColor: "white",
    borderRadius: 10,
    height: hp(6),
    padding: wp(2),
    fontStyle: "italic",
  },

  textInputForm: {
    color: "white",
    fontSize: wp(5),
    textAlign: "center",
    marginBottom: hp(1),
  },

  componentInputs: {
    // backgroundColor: "green",
    marginVertical: wp(3),
  },

  buttonForm: {
    backgroundColor: stylesButton.buttonsColorPrimary.backgroundColor,
    height: hp(7),
    width: wp(50),
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    // marginTop: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
