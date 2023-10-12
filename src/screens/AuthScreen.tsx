import React from "react";
import { Controller, useForm } from "react-hook-form";

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

export const AuthScreen = () => {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  console.log("WIN >> ", windowHeight);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ ...styleAuthScreen.background }}>
          <Image
            style={{
              height: windowHeight * 0.25,
              width: "100%",
              marginBottom: 20,
              //   backgroundColor: "#0553",
              marginTop: -100,
            }}
            source="https://images.vexels.com/media/users/3/153334/isolated/preview/cf5ff26985a46460a5a29aa9443cb323-logotipo-de-sitamet-power-gym.png"
            placeholder={blurhash}
            contentFit="scale-down"
            transition={1000}
          />

          <View
            style={{
              ...styleAuthScreen.form,
              height: windowHeight * 0.45,
              width: windowWidth * 0.7,
            }}
          >
            <View style={styleAuthScreen.componentInputs}>
              <Text style={styleAuthScreen.textInputForm}>Usuario</Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styleAuthScreen.inputForm}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Ingrese un usuario"
                  />
                )}
                name="nombre"
                rules={{ required: true }}
              />
            </View>

            <View style={styleAuthScreen.componentInputs}>
              <Text style={styleAuthScreen.textInputForm}>Contraseña</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styleAuthScreen.inputForm}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    secureTextEntry
                    placeholder="Ingrese una contraseña"
                  />
                )}
                name="contrasena"
                rules={{ required: true }}
              />
            </View>

            <View
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
                    Iniciar Sesión
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                textAlign: "center",
                color: "white",
                marginTop: 40,
                // fontStyle: "italic",
              }}
            >
              Aun no tienes una cuenta?
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                marginTop: 10,
                fontStyle: "italic",
              }}
            >
              Registrarse
            </Text>

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
const styleAuthScreen = StyleSheet.create({
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
    height: 45,
    padding: 10,
    fontStyle: "italic",
  },

  textInputForm: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },

  componentInputs: {
    // backgroundColor: "green",
    marginVertical: 20,
  },

  buttonForm: {
    backgroundColor: "#C9FB03",
    height: 50,
    width: 200,
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
