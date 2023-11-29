import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  asignarRutinaACliente,
  listaRutinas,
} from "../services/rutinasEjerciciosService";
import { Controller, useForm } from "react-hook-form";
import { TextError } from "./TextError";
import { SelectInput } from "./SelectInput";
import { Button } from "./Button";
import {
  SchemaAsignarRutinaCliente,
  TypeAsignarRutinaCliente,
} from "../types/TypesRutinasEjercicios";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToastLong } from "../utils/toast";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypesNavigator } from "../types/TypesNavigator";

interface Props {
  showModal?: boolean;
  setShowModal: (showModal: boolean) => void;

  onAccept: () => void;
  onCancel?: () => void;

  title?: string;
  description?: string;

  acceptText?: string;
  cancelText?: string;

  id_cliente: string;

  navigation: StackNavigationProp<TypesNavigator, any, undefined>;
}

export const ModalRutina = ({
  setShowModal,
  showModal = false,
  description = "Descripcion example",
  title = "Titulo example",
  onAccept,
  onCancel,
  acceptText = "Confirmar",
  cancelText = "Cancelar",
  id_cliente,
  navigation,
}: Props) => {
  //   const [showModalVisible, setShowModalVisible] = useState(false);

  const { mutate, error, data } = useMutation({
    mutationKey: ["asignarRutinaACliente"],
    mutationFn: asignarRutinaACliente,
    onSuccess: (data) => {
      showToastLong("Rutina asignada con exito!");
      navigation.navigate("HomeScreen");
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      showToastLong("Error al asignar la rutina");
    },
    onMutate: () => {
      console.log("EJECUtando mutate ....");
    },
  });

  const {
    data: dataRutinas,
    error: errorRutinas,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaRutinas"],
    queryFn: listaRutinas,
  });

  let rutinasLista = useMemo(() => {
    if (isLoading || !dataRutinas) return [];
    return dataRutinas.map((rutina: { nombre: string; id: string }) => ({
      label: rutina.nombre,
      value: rutina.id,
      id: rutina.id,
    }));
  }, [dataRutinas, isLoading]);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaAsignarRutinaCliente>({
    mode: "onChange",
    defaultValues: {
      id_cliente,
    },
    resolver: zodResolver(TypeAsignarRutinaCliente),
  });

  const onSubmit = (data: SchemaAsignarRutinaCliente) => {
    console.log("DAT ACONFIRAM >> ", JSON.stringify(data, null, 3));
    mutate(data);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              width: wp(90),
              //   height: height * 0.3,
              maxHeight: hp(90),
              backgroundColor: "gray",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: wp(5),
                fontWeight: "bold",
                marginBottom: hp(3),
              }}
            >
              Asignar Rutina
            </Text>

            <Controller
              name="id_rutina"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  {errors.id_rutina?.message && (
                    <TextError message={errors.id_rutina.message} />
                  )}
                  <SelectInput
                    label=""
                    onChange={onChange}
                    options={rutinasLista}
                    value={value as never}
                    error={errors.id_rutina?.message as never}
                  />
                </>
              )}
            />

            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                width: wp(70),
                justifyContent: "space-between",
                marginTop: hp(2),
              }}
            >
              <Button buttonType="secondary" width={wp(30)} text="Cancelar" />
              <Button
                buttonType="primary"
                width={wp(30)}
                text="Confirmar"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3),

    // backgroundColor: "#ffffff24",
    // backfaceVisibility: "hidden",
    // backgroundColor: "red",
    // position: "absolute",
    top: "30%",
  },
  modalView: {
    // position: "relative",

    margin: wp(5),
    backgroundColor: "white",
    // backgroundColor: "red",
    borderRadius: 20,

    paddingHorizontal: wp(5),
    paddingVertical: hp(5),

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
    backgroundColor: "#f84b4b",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  buttonAccept: {
    // backgroundColor: "#2196F3",

    backgroundColor: "#16213E",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: hp(1),
    textAlign: "center",
    // backgroundColor: "red",
  },
});
