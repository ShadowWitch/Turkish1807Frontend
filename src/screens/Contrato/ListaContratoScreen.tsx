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
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  ResponseListaClientes,
  listaClientes,
} from "../../services/clientesService";
import { ButtonBack } from "../../components/ButtonBack";
import { Button } from "../../components/Button";
import { compararFechas, formatearISO } from "../../utils/formatDate";
import {
  RequestRenovarContrato,
  renovarContrato,
} from "../../services/contratosService";
import { showToastLong } from "../../utils/toast";
import { ModalComponent } from "../../components/Modal";
import { useForm } from "react-hook-form";

export interface ItemFlatListType {
  data: ResponseListaClientes;

  // onRenovar: (item: RequestRenovarContrato) => void;

  mutate: UseMutateFunction<any, Error, RequestRenovarContrato, void>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

export const ListaContratoScreen = ({
  navigation,
  route,
}: PropsWithNavigator) => {
  const {
    data: dataClientes,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["listaClientes"],
    queryFn: listaClientes,
  });

  const {
    mutate,
    error: errorRenovar,
    data,
  } = useMutation({
    mutationKey: ["renovarContrato"],
    mutationFn: renovarContrato,
    onSuccess: () => {
      showToastLong("Contrato renovado!");
      navigation.navigate("HomeScreen");
    },
    onError: () => {
      // console.log("ERRRORRR >> ");
      showToastLong("Ha ocurrido un error");
    },
    onMutate: () => {
      console.log("EJECUtando mutate ....");
    },
  });

  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm<RequestRenovarContrato>({
  //   mode: "onChange",
  // });

  useMemo(() => {
    refetch();
  }, []);

  return (
    <>
      <ButtonBack />
      <Background marginTop={hp(10)}>
        {error === null ? (
          isLoading === true ? (
            <View>
              <ActivityIndicator size={wp(3)} color={"white"} />
              <Text
                style={{
                  color: "white",
                }}
              >
                Cargando...
              </Text>
            </View>
          ) : (
            <FlatList
              data={dataClientes as ResponseListaClientes[]}
              renderItem={({ item }) => (
                <ItemFlatList data={item} refetch={refetch} mutate={mutate} />
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
          )
        ) : (
          <View
            style={{
              backgroundColor: "red",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: wp(2),
              }}
              name={"person-circle-outline"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                color: "white",
                fontSize: 100,
              }}
            >
              Errrorasooooooo
            </Text>
          </View>
        )}
      </Background>
    </>
  );
};

const ItemFlatList = ({ data, mutate, refetch }: ItemFlatListType) => {
  console.log("DATA >> ", JSON.stringify(data, null, 3));
  const [showModal, setShowModal] = useState(false);
  const onCancel = () => {
    setShowModal(false);
  };
  const onSubmit = () => {
    setShowModal(true);
  };

  const onRenovar = () => {
    mutate({
      fechaDeFin: formatearISO(
        new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
      ),
      id_contrato: data.contratos.at(0).id,
      ultimaRenovacion: formatearISO(new Date().toISOString()),
    });

    refetch();
  };

  console.log("DATA  PORUIEBA   >> ", JSON.stringify(data, null, 3));

  return (
    <>
      {showModal && (
        <ModalComponent
          onAccept={onRenovar as never}
          onCancel={onCancel}
          showModal={showModal}
          setShowModal={setShowModal}
          title="Confirmación"
          description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
        />
      )}
      <View
        style={{
          // backgroundColor: "green",
          justifyContent: "space-between",
          flexDirection: "row",
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
              name={"person-circle-outline"}
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
              Nombre: {`${data.primerNombre || ""} ${data.segundoNombre || ""}`}
            </Text>
          </View>

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
              name={"calendar-outline"}
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
              Ultima renovación:{" "}
              {`${
                data.contratos.at(0)?.ultimaRenovacion
                  ? formatearISO(data.contratos.at(0).ultimaRenovacion)
                  : "No existe"
              }`}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.contratos.at(0)?.ultimaRenovacion &&
            compararFechas({
              fecha: formatearISO(data.contratos.at(0)?.ultimaRenovacion),
              fechaActual: formatearISO(new Date().toISOString()),
            }) && (
              <Button
                text="Renovar"
                buttonType="primary"
                width={wp(25)}
                onPress={onSubmit}
                // onPress={() =>
                //   onShowMore({
                //     fechaDeFin: formatearISO(new Date().toISOString()),
                //     id_contrato: data.contratos.at(0).id,
                //     ultimaRenovacion: formatearISO(new Date().toISOString()),
                //   })
                // }
              />
            )}

          {/* <TouchableOpacity onPress={() => onShowMore(data)}>
            <Text
              style={{
                color: "white",
                fontSize: wp(4),
              }}
            >
              Ver mas...
            </Text>
          </TouchableOpacity> */}
        </View>
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
