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
import { SchemaLogin } from "../types/TypesAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAuth, signIn } from "../services/auth";
import { SaveStorage } from "../storage/Storage";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { showToastLong } from "../utils/toast";
import {
  SchemaRegisterUser,
  TypeRegisterUser,
} from "../types/TypeRegisterUser";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegistrarUsuarioScreen = () => {
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();

  const { mutate, error, data } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signIn,
    onSuccess: (data) => {
      if (data.token) {
        const token: string = data.token;
        SaveStorage({
          key: "token",
          data: token,
        });
        setIsAuthenticated({
          token,
          user: data.data,
          status: "authenticated",
        }); //* Autenticar user
        navigation.navigate("HomeScreen" as never);
      }
    },
    onError: (err) => {
      console.log(err);
      showToastLong("Credenciales incorrectas");
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
  } = useForm<SchemaRegisterUser>({
    mode: "onChange",
    // resolver: zodResolver(TypeRegisterUser),
  });

  const onSubmit = (data: SchemaRegisterUser) => {
    console.log("DATA qweqwe >> ", JSON.stringify(data, null, 3));

    // mutate(data);

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
              height: hp(15),
              width: wp(70),
              marginBottom: hp(5),
              // backgroundColor: "#0553",
              // marginTop: -100,
            }}
            // source="https://images.vexels.com/media/users/3/153334/isolated/preview/cf5ff26985a46460a5a29aa9443cb323-logotipo-de-sitamet-power-gym.png"
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
              <Text style={styleAuthScreen.textInputForm}>Usuario</Text>

              <Controller
                name="nombre"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styleAuthScreen.inputForm}
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

            <View style={styleAuthScreen.componentInputs}>
              <Text style={styleAuthScreen.textInputForm}>Contraseña</Text>
              <Controller
                name="contrasena"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styleAuthScreen.inputForm}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      secureTextEntry
                      placeholder="Ingrese una contraseña"
                    />
                    {errors.contrasena?.message && (
                      <TextError message={errors.contrasena.message} />
                    )}
                  </>
                )}
              />

              <Text style={{ ...styleAuthScreen.textInputForm, marginTop: 10 }}>
                Repetir Contraseña
              </Text>
              <Controller
                name="repetirContrasena"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styleAuthScreen.inputForm}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      secureTextEntry
                      placeholder="Repita la contraseña"
                    />
                    {errors.repetirContrasena?.message && (
                      <TextError message={errors.repetirContrasena.message} />
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
                    Registrarse
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
              Ya tienes una cuenta?
            </Text>

            <TouchableOpacity
              style={
                {
                  // backgroundColor: "red",
                }
              }
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

            {/* <View
              style={{
                ...styleAuthScreen.componentInputs,
                alignItems: "center",
              }}
            >
              <TouchableOpacity activeOpacity={0.8}>
                <View style={styleAuthScreen.buttonForm}>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Registrarse
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
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
