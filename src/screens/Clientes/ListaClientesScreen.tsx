import React, { useEffect, useMemo } from "react";

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
import { useQuery } from "@tanstack/react-query";
import {
  ResponseListaClientes,
  listaClientes,
} from "../../services/clientesService";
import { ButtonBack } from "../../components/ButtonBack";

export interface ItemFlatListType {
  data: ResponseListaClientes;

  onShowMore: (item: ResponseListaClientes) => void;
}

export const ListaClientesScreen = ({
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

  const onShowMore = (item: ResponseListaClientes) => {
    console.log("ITEM ACACAAA >> ", JSON.stringify(item, null, 3));

    navigation.navigate("DetallesScreen", {
      ...item,
    }),
      console.log("DATA CLIENTES >> ", JSON.stringify(dataClientes, null, 3));
  };

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
                <ItemFlatList data={item} onShowMore={onShowMore} />
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

const ItemFlatList = ({ data, onShowMore }: ItemFlatListType) => {
  console.log("DATA ITEM FLAT >> ", data);
  return (
    <>
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
              Nombre:{" "}
              {`${data.primerNombre || ""} ${data.primerApellido || ""}`}
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
              name={"body"}
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
              Estatura: {`${data.chequeos.at(-1)?.estatura || ""} Mts`}
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
              name={"leaf"}
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
              Peso: {`${data.chequeos.at(-1)?.peso || ""} Kg`}
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
              name={"barbell"}
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
              Niv. Masa: {`${data.chequeos.at(-1)?.nivelDeMasa || ""} %`}
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
              name={"fast-food"}
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
              Niv. Grasa: {`${data.chequeos.at(-1)?.nivelDeGrasa || ""} %`}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => onShowMore(data)}>
            <Text
              style={{
                color: "white",
                fontSize: wp(4),
              }}
            >
              Ver mas...
            </Text>
          </TouchableOpacity>
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
