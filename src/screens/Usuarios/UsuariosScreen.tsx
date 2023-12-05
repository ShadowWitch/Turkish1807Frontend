import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TurboModuleRegistry,
  ActivityIndicator,
} from "react-native";
import { IDataExample, dataExample } from "../../data/data";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Background } from "../../components/Background";
import { PropsWithNavigator } from "../../types/TypesNavigator";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  ResponseListaClientes,
  listaClientes,
} from "../../services/clientesService";
import { ButtonBack } from "../../components/ButtonBack";
import { ErrorConexion } from "../../components/ErrorConexion";
import { NoHayRegistros } from "../../components/NoHayRegistros";
import { string } from "zod";
import { formatearFecha } from "../../utils/formatDate";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import { listaRutinas } from "../../services/rutinasEjerciciosService";
import {
  DatumListaUsuarios,
  activarODesactivarUser,
  listaUsuarios,
} from "../../services/usuariosService";
import { Button } from "../../components/Button";
import { ModalComponent } from "../../components/Modal";
import { showToastLong } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { ModalRol } from "../../components/ModalRol";

interface ItemFlatList {
  data: DatumListaUsuarios;

  showModal: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onConfirm: ({
    id,
    estado,
  }: {
    id: string;
    estado: "Activo" | "Inactivo";
  }) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  showModalRol: boolean;
  onSubmitRol: () => void;
  onCancelRol: () => void;
  onConfirmRol: (id: string) => void;
  setShowModalRol: React.Dispatch<React.SetStateAction<boolean>>;

  refetchUsuarios: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<DatumListaUsuarios[] | undefined, Error>>;
}

export const UsuariosScreen = ({ navigation, route }: PropsWithNavigator) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRol, setShowModalRol] = useState(false);

  const [idUserSeleccionado, setidUserSeleccionado] = useState<string>("");

  const {
    data: dataListaUsuarios,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaUsuarios"],
    queryFn: listaUsuarios,
  });

  const {
    mutate,
    error: errorUser,
    data,
  } = useMutation({
    mutationKey: ["activarODesactivarUser"],
    mutationFn: activarODesactivarUser,
    onSuccess: (data) => {
      showToastLong("Usuario inactivado o activado con exito");
      setShowModal(false);
      refetch();
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      showToastLong("Error al inactivar o activar usuario");
    },
    onMutate: () => {},
  });

  const onSubmitRol = () => {
    setShowModalRol(true);
  };
  const onCancelRol = () => {
    setShowModalRol(false);
  };

  const onConfirmRol = () => {
    console.log("qweqwe");
  };

  const onSubmit = (id: string) => {
    setidUserSeleccionado(id);

    console.log("IDDD >> ", id);
    setShowModal(true);
  };
  const onCancel = () => {
    setShowModal(false);
  };

  const onConfirm = ({
    id,
    estado,
  }: {
    id: string;
    estado: "Activo" | "Inactivo";
  }) => {
    mutate({
      id: idUserSeleccionado,
      estado,
    });
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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <ButtonBack />
      <ProtectedComponent permissions={["6000"]}>
        <Background marginTop={hp(10)}>
          <FlatList
            data={dataListaUsuarios}
            renderItem={({ item }) => (
              <ItemFlatList
                data={item}
                showModal={showModal}
                onCancel={onCancel}
                onConfirm={onConfirm}
                onSubmit={() => onSubmit(item.id)}
                setShowModal={setShowModal}
                onCancelRol={onCancelRol}
                onConfirmRol={onConfirmRol}
                onSubmitRol={onSubmitRol}
                setShowModalRol={setShowModalRol}
                refetchUsuarios={refetch}
                showModalRol={showModalRol}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <ItemSeparator />}
            style={{
              // backgroundColor: "yellow",
              paddingHorizontal: wp(3),
              paddingTop: hp(1),
              // paddingBottom: hp(30),
              // marginBottom: hp(3),
            }}
            ListFooterComponent={() => (
              <View
                style={{
                  // backgroundColor: "red",
                  height: hp(5),
                }}
              />
            )}
            // ListHeaderComponent={() => <HeaderTitle title="Opciones de Menu" />} //* Para ponerle un "Header"
          />
        </Background>
      </ProtectedComponent>
    </>
  );
};

const ItemFlatList = ({
  data,
  showModal,
  onCancel,
  onConfirm,
  onSubmit,
  setShowModal,

  showModalRol,
  onCancelRol,
  onConfirmRol,
  onSubmitRol,
  setShowModalRol,
  refetchUsuarios,
}: ItemFlatList) => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(
    null
  );
  return (
    <>
      <View
        style={{
          // backgroundColor: "green",
          justifyContent: "space-between",
          flexDirection: "column",
          borderStartWidth: wp(1),
          borderStartColor: "green",
          borderRadius: 5,

          // borderTopWidth: 1,
          // borderTopColor: "green",
        }}
      >
        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: wp(2),
          }}
        >
          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: wp(2),
              }}
              name={"person"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: "400",
                color: "white",
              }}
            >
              Usuario: {`${data.nombre}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: wp(2),
          }}
        >
          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: wp(2),
              }}
              name={"grid"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: "400",
                color: "white",
              }}
            >
              Rol: {`${data.roles?.nombre || "Sin Rol"}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: wp(2),
          }}
        >
          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: wp(2),
              }}
              name={"mail"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: "400",
                color: "white",
              }}
            >
              Email: {`${data.correoElectronico || "Desconocido"}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: wp(2),
          }}
        >
          <View
            style={{
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: hp(1),
            }}
          >
            <ProtectedComponent permissions={["6001"]}>
              {data.estado === "Activo" ? (
                <Button
                  buttonType="secondary"
                  text="Inactivar"
                  onPress={onSubmit}
                />
              ) : (
                <Button
                  buttonType="primary"
                  text="Activar"
                  onPress={onSubmit}
                />
              )}
            </ProtectedComponent>
            <ProtectedComponent permissions={["6002"]}>
              <Button
                buttonType="primary"
                text="Asignar Rol"
                width={wp(30)}
                onPress={() => (onSubmitRol(), setUsuarioSeleccionado(data.id))}
              />
            </ProtectedComponent>
          </View>
        </View>

        {showModal && (
          <ModalComponent
            onAccept={() =>
              onConfirm({
                id: data.id,
                estado: data.estado === "Activo" ? "Inactivo" : "Activo",
              })
            }
            onCancel={onCancel}
            showModal={showModal}
            setShowModal={setShowModal}
            title="Confirmación"
            description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
          />
        )}

        {showModalRol && usuarioSeleccionado != null && (
          <ModalRol
            id_usuario={usuarioSeleccionado}
            onAccept={() => onConfirmRol(data.id)}
            setShowModal={setShowModalRol}
            acceptText="Confirmar"
            cancelText="Cancelar"
            description="qweqweqweqwe"
            onCancel={onCancelRol}
            showModal={showModalRol}
            title="KWKWKW"
            refetchUsuarios={refetchUsuarios}
          />
        )}
      </View>
    </>
  );
};

const ItemSeparator = () => {
  return (
    <View
      style={{
        // backgroundColor: "white",
        borderBottomWidth: 1,
        opacity: 0.2,
        marginVertical: hp(1),
        borderColor: "white",
      }}
    />
  );
};
