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
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface ItemFlatList {
  data: DatumListaUsuarios;

  showModal: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onConfirm: (id: string) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsuariosScreen = ({ navigation, route }: PropsWithNavigator) => {
  const [showModal, setShowModal] = useState(false);

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
      showToastLong("Usuario inactivado con exito");
      setShowModal(false);
      refetch();
    },
    onError: (err: any) => {
      console.log("ERRRORRR >> ", err);
      showToastLong("Error al inactivar usuario");
    },
    onMutate: () => {},
  });

  const onSubmit = () => {
    setShowModal(true);
  };
  const onCancel = () => {
    setShowModal(false);
  };

  const onConfirm = (id: string) => {
    mutate({
      id,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <ButtonBack />
      <ProtectedComponent permissions={["1004"]}>
        <Background marginTop={hp(10)}>
          <FlatList
            data={dataListaUsuarios}
            renderItem={({ item }) => (
              <ItemFlatList
                data={item}
                showModal={showModal}
                onCancel={onCancel}
                onConfirm={onConfirm}
                onSubmit={onSubmit}
                setShowModal={setShowModal}
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
}: ItemFlatList) => {
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
            }}
          >
            <Button buttonType="secondary" text="Eliminar" onPress={onSubmit} />
            <Button buttonType="primary" text="Editar" />
          </View>
        </View>

        {showModal && (
          <ModalComponent
            onAccept={() => onConfirm(data.id)}
            onCancel={onCancel}
            showModal={showModal}
            setShowModal={setShowModal}
            title="Confirmación"
            description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
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
