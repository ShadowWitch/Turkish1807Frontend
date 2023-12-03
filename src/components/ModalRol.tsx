import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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
import {
  SchemaAsignarRolUsuario,
  TypeAsignarRolUsuario,
} from "../types/TypeRoles";
import { listaRolesCatalogo } from "../services/rolesPermisosService";
import { DatumListaUsuarios, updateRolUser } from "../services/usuariosService";
import { useNavigation } from "@react-navigation/native";

interface Props {
  showModal?: boolean;
  setShowModal: (showModal: boolean) => void;

  onAccept: () => void;
  onCancel?: () => void;

  title?: string;
  description?: string;

  acceptText?: string;
  cancelText?: string;

  id_usuario: string;

  refetchUsuarios: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<DatumListaUsuarios[] | undefined, Error>>;

  // navigation: StackNavigationProp<TypesNavigator, any, undefined>;
}

export const ModalRol = ({
  setShowModal,
  showModal = false,
  description = "Descripcion example",
  title = "Titulo example",
  onAccept,
  onCancel,
  acceptText = "Confirmar",
  cancelText = "Cancelar",
  id_usuario,
  refetchUsuarios,
}: // navigation,
Props) => {
  //   const [showModalVisible, setShowModalVisible] = useState(false);

  const { navigate } = useNavigation();

  const { mutate, error, data } = useMutation({
    mutationKey: ["updateRolUser"],
    mutationFn: updateRolUser,
    onSuccess: (data) => {
      showToastLong("Rol asignado con exito!");
      refetchUsuarios();
      setShowModal(false);
      // navigate("HomeScreen");
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      showToastLong("Error al asignar el rol");
    },
    onMutate: () => {},
  });

  const {
    data: dataListaRoles,
    error: errorRutinas,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaRolesCatalogo"],
    queryFn: listaRolesCatalogo,
  });

  let rolesLista = useMemo(() => {
    if (isLoading || !dataListaRoles) return [];
    return dataListaRoles.map((rol: { nombre: string; id: string }) => ({
      label: rol.nombre,
      value: rol.id,
      id: rol.id,
    }));
  }, [dataListaRoles, isLoading]);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchemaAsignarRolUsuario>({
    mode: "onChange",
    defaultValues: {
      id_usuario,
    },
    resolver: zodResolver(TypeAsignarRolUsuario),
  });

  const onSubmit = (data: SchemaAsignarRolUsuario) => {
    // console.log("DATA >> ", JSON.stringify(data, null, 3));
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
              Asignar Rol
            </Text>

            <Controller
              name="id_rol"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  {errors.id_usuario?.message && (
                    <TextError message={errors.id_usuario.message} />
                  )}
                  <SelectInput
                    label=""
                    onChange={onChange}
                    options={rolesLista as never}
                    value={value as never}
                    error={errors.id_usuario?.message as never}
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
              <Button
                buttonType="secondary"
                width={wp(30)}
                text="Cancelar"
                onPress={onCancel}
              />
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
