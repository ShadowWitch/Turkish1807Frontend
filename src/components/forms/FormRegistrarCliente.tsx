import React from "react";
import { useWindowDimensions } from "react-native";

import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "../Input";
import { DateTimePicker } from "../DateTimePicker";
import { Select } from "../Select";
import { Button } from "../Button";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";
import { SelectInput } from "../SelectInput";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { styleAuthScreen } from "../../screens/AuthScreen";
import { TextError } from "../TextError";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const FormRegistrarCliente = ({ navigation, route }: Props) => {
  const { height, width } = useWindowDimensions();

  const onAceptar = () => {
    navigation.navigate("ChequeosScreen");
  };

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <TouchableWithoutFeedback
        style={{ borderColor: " green" }}
        onPress={() => Keyboard.dismiss()}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            height: height * 0.8,
            // backgroundColor: "gray",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              // backgroundColor: "red",
              textAlign: "center",
            }}
          >
            Datos del Cliente22
          </Text>
          {/* <Input
            text="DNI (opcional)"
            width={width * 0.75}
            textInputSize={20}
          /> */}

          <Controller
            name="nombre"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El nombre de usuario es requerido.",
              },
              minLength: {
                value: 5,
                message:
                  "El nombre de usuario debe tener minimo de 5 caracteres",
              },
              maxLength: {
                value: 15,
                message:
                  "El nombre de usuario debe tener máximo 15 caracteres.",
              },
            }}
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

          <Controller
            name="nombre"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El nombre de usuario es requerido.",
              },
              minLength: {
                value: 5,
                message:
                  "El nombre de usuario debe tener minimo de 5 caracteres",
              },
              maxLength: {
                value: 15,
                message:
                  "El nombre de usuario debe tener máximo 15 caracteres.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styleAuthScreen.inputForm}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Nombre Completo"
                />
                {errors.nombre?.message && (
                  <TextError message={errors.nombre.message} />
                )}
              </>
            )}
          />

          <Input
            text="Nombre Completo"
            width={width * 0.75}
            textInputSize={20}
          />

          <DateTimePicker textDate="Fecha de Nacimiento" />

          <Input text="Telefono" width={width * 0.75} textInputSize={20} />
          <Input
            text="Correo (opcional)"
            width={width * 0.75}
            textInputSize={20}
          />
          <Input
            text="Direccion (opcional)"
            width={width * 0.75}
            textInputSize={20}
          />

          <Select text="Municipio" width={width * 0.75} />

          {/* <SelectInput label="Municipio" value={} /> */}

          <View
            style={{
              marginTop: 30,
              width: width * 0.75,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button buttonType="secondary" text="Cancelar" width={100} />
            <Button
              buttonType="primary"
              text="Siguiente"
              onPress={onAceptar}
              width={120}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
