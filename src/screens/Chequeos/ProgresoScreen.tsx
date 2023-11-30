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
import { ErrorConexion } from "../../components/ErrorConexion";
import { NoHayRegistros } from "../../components/NoHayRegistros";
import { string } from "zod";
import { formatearFecha } from "../../utils/formatDate";
import { ProtectedComponent } from "../../components/ProtectedComponent";

export interface ItemFlatListType {
  chequeos: Chequeo;
}

interface Chequeo {
  id: string;
  peso: string;
  estatura: string;
  nivelDeMasa: string;
  nivelDeGrasa: string;
  fechaDelChequeo: string;
  id_cliente: string;
  createdAt: string;
  updatedAt: string;
}

interface DataCliente {
  id: string;
  chequeos: Chequeo[];
}

export const ProgresoScreen = ({ navigation, route }: PropsWithNavigator) => {
  const { params } = route;
  const dataCliente = params as DataCliente;

  return (
    <>
      <ButtonBack />
      <ProtectedComponent permissions={["1004"]}>
        <Background marginTop={hp(10)}>
          <FlatList
            data={dataCliente.chequeos}
            renderItem={({ item }) => <ItemFlatList chequeos={item} />}
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

const ItemFlatList = ({ chequeos }: ItemFlatListType) => {
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
              Estatura: {`${chequeos.estatura} Mts`}
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
              Peso: {`${chequeos.peso} Kg`}
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
              Niv. Masa: {`${chequeos.nivelDeMasa} %`}
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
              Niv. Grasa: {`${chequeos.nivelDeGrasa} %`}
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
              Fecha: {`${formatearFecha(new Date(chequeos.createdAt))}`}
            </Text>
          </View>
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
