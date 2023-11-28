import React, { useMemo, useState } from "react";

import {
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text,
} from "react-native";
import { Input } from "../Input";
import { Select } from "../Select";
import { ImagePickerComponent } from "../ImagePickerComponent";
import { Button } from "../Button";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonBack } from "../ButtonBack";
import { Controller, useForm } from "react-hook-form";
import { SchemaRegisterEjercicio } from "../../types/TypesEjercicio";
import { TextError } from "../TextError";
import { TextInput } from "react-native-gesture-handler";
import { styleAuthScreen } from "../../screens/AuthScreen";
import { SelectInput } from "../SelectInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  listaTipoEjercicios,
  registrarEjercicioService,
} from "../../services/ejerciciosService";
import { ModalComponent } from "../Modal";
import { useNavigation } from "@react-navigation/native";

export const FormCrearEjercicio = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const {
    data: dataTipoEjercicios,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaTipoEjercicios"],
    queryFn: listaTipoEjercicios,
  });

  const {
    mutate,
    error: erroMutation,
    data,
  } = useMutation({
    mutationKey: ["registrarEjercicioService"],
    mutationFn: registrarEjercicioService,
    onSuccess: (data) => {
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

  const onConfirm = () => {
    setShowModal(false);
    navigation.navigate("HomeScreen");
  };

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaRegisterEjercicio>({
    mode: "onChange",
  });

  let tipoEjercicios = useMemo(() => {
    if (isLoading || !dataTipoEjercicios) return [];
    return dataTipoEjercicios.map(
      (tipoEjercicio: { nombreTipo: string; id: string }) => ({
        label: tipoEjercicio.nombreTipo,
        value: tipoEjercicio.id,
        id: tipoEjercicio.id,
      })
    );
  }, [dataTipoEjercicios, isLoading]);

  const onSubmit = (data: any) => {
    const sendData: SchemaRegisterEjercicio = {
      descripcion: data.descripcion,
      id_tipo: data.id_tipo.value,
      nombre: data.nombre,
    };
    mutate(sendData);
  };

  return (
    <>
      <ButtonBack />
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
              height: hp(75),
              // backgroundColor: "red",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: wp(8),
                // backgroundColor: "red",
                textAlign: "center",
              }}
            >
              Registrar Ejercicio
            </Text>

            <Controller
              name="nombre"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El nombre es requerido.",
                },
                minLength: {
                  value: 3,
                  message: "Nombre tiene que tener minimo 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Nombre tiene que tener un máximo de 30 caracteres",
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
                    placeholder="Nombre del Ejercicio"
                    // keyboardType="number-pad"
                  />
                </>
              )}
            />

            <Controller
              name="descripcion"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La descripción es requerida.",
                },
                minLength: {
                  value: 5,
                  message: "La descripción tiene que tener minimo 5 caracteres",
                },
                maxLength: {
                  value: 25,
                  message:
                    "La descripción tiene que tener un máximo de 25 caracteres",
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
                    placeholder="Descripción"
                    // keyboardType="number-pad"
                  />
                </>
              )}
            />

            {/* <Input
              text="Nombre del Ejercicio"
              width={wp(75)}
              textInputSize={wp(3)}
            /> */}
            {/* <Input text="Descripcion" width={wp(75)} textInputSize={wp(3)} /> */}

            <Controller
              name={"id_tipo"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El tipo de ejercicio es requerido.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label="Tipo Ejercicio"
                  options={tipoEjercicios}
                  value={value}
                  onChange={onChange}
                  error={{ message: errors.id_tipo?.message || "" }}
                />
              )}
            />
            {/* <Select width={wp(75)} text="Seleccione una opción" /> */}

            {/* <ImagePickerComponent width={wp(75)} /> */}

            <View
              style={{
                //   backgroundColor: "red",
                marginTop: hp(5),
                width: wp(75),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button buttonType="secondary" text="Cancelar" width={wp(30)} />
              <Button
                buttonType="primary"
                text="Aceptar"
                onPress={handleSubmit(onSubmit)}
                width={wp(30)}
              />
              {showModal && (
                <ModalComponent
                  onAccept={onConfirm}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  title="Ejercicio registrado con exito"
                  description="Se ha registrado un ejercicio"
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
