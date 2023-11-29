import React, { useMemo } from "react";
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
  SchemaAsignarEjercicioRutina,
  TypeAsignarEjercicioARutina,
  TypeRegisterRutina,
} from "../../types/TypesRutinasEjercicios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  asignarEjercicioARutina,
  listaRutinas,
  registrarRutinaService,
} from "../../services/rutinasEjerciciosService";
import { showToastLong } from "../../utils/toast";
import { SelectInput } from "../../components/SelectInput";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const AsignarRutinasScreen = ({ navigation, route }: Props) => {
  const {
    data: dataRutinas,
    error: errorRutinas,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaRutinas"],
    queryFn: listaRutinas,
  });

  console.log("LISTA RUTINA >> ", JSON.stringify(listaRutinas, null, 3));

  let rutinasLista = useMemo(() => {
    if (isLoading || !dataRutinas) return [];
    return dataRutinas.map((rutina: { nombre: string; id: string }) => ({
      label: rutina.nombre,
      value: rutina.id,
      id: rutina.id,
    }));
  }, [dataRutinas, isLoading]);

  const { mutate, error, data } = useMutation({
    mutationKey: ["asignarEjercicioARutina"],
    mutationFn: asignarEjercicioARutina,
    onSuccess: (data) => {
      showToastLong("Ejercicio asignado a rutina con exito!");
      navigation.navigate("HomeScreen");
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      showToastLong("Error al asignar ejercicio a rutina");
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
  } = useForm<SchemaAsignarEjercicioRutina>({
    mode: "onChange",
    resolver: zodResolver(TypeAsignarEjercicioARutina),
  });

  const onSubmit = (data: SchemaAsignarEjercicioRutina) => {
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
                Asignar Ejercicios
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
                  name="id_rutina_entrenamiento"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.id_rutina_entrenamiento?.message && (
                        <TextError
                          message={errors.id_rutina_entrenamiento.message}
                        />
                      )}
                      <SelectInput
                        label="Rutinas"
                        onChange={onChange}
                        options={rutinasLista}
                        value={value as never}
                        // error={}
                      />
                    </>
                  )}
                />

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
                        placeholder="Nombre del ejercicio"
                        keyboardType="default"
                      />
                    </>
                  )}
                />

                <Controller
                  name="series"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.series?.message && (
                        <TextError message={errors.series.message} />
                      )}
                      <TextInput
                        style={{
                          ...styleAuthScreen.inputForm,
                          width: wp(80),
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Cantidad de series"
                        keyboardType="number-pad"
                      />
                    </>
                  )}
                />

                <Controller
                  name="repeticiones"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {errors.repeticiones?.message && (
                        <TextError message={errors.repeticiones.message} />
                      )}
                      <TextInput
                        style={{
                          ...styleAuthScreen.inputForm,
                          width: wp(80),
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Cantidad de repeticiones"
                        keyboardType="number-pad"
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
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
