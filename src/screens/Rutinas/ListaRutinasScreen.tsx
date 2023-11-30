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
import { ScrollView } from "react-native-gesture-handler";
import { acortarTexto } from "../../utils/acortarTexto";
import { listaRutinas } from "../../services/rutinasEjerciciosService";
import { DatumRutinas } from "../../types/TypeRutinasResponse";
import { ProtectedComponent } from "../../components/ProtectedComponent";

export interface ItemFlatListType {
  data: DatumRutinas;
}

export const ListaRutinasScreen = ({
  navigation,
  route,
}: PropsWithNavigator) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["listaRutinas"],
    queryFn: listaRutinas,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (error !== null)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#16213E",
        }}
      >
        <ErrorConexion />
      </View>
    );

  console.log("LISTA RUTINAS >> ", JSON.stringify(listaRutinas, null, 3));

  return (
    <>
      <ButtonBack />
      <ProtectedComponent permissions={["3002"]}>
        <Background marginTop={hp(10)}>
          {error === null &&
            (isLoading === true ? (
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
              <>
                {data.length > 0 ? (
                  <FlatList
                    data={data as DatumRutinas[]}
                    renderItem={({ item }) => <ItemFlatList data={item} />}
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
                    // ListHeaderComponent={() => <HeaderTitle title="Opciones de Menu" />}
                  />
                ) : (
                  <NoHayRegistros />
                )}
              </>
            ))}
        </Background>
      </ProtectedComponent>
    </>
  );
};

const ItemFlatList = ({ data }: ItemFlatListType) => {
  // const nombres = data..map(
  //   (e) => e.rutinaEntrenamiento.nombre
  // );
  // const texto = nombres.join(", ");

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
              Nombre Rutina: {`${data.nombre}`}
            </Text>
          </View>

          {data.TBL_REL_RUTINA_EJERCICIO.map((item, index) => (
            <View
              style={{
                // backgroundColor: "gray",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <Ionicons
                style={{
                  marginHorizontal: wp(2),
                }}
                name={"person-circle-outline"}
                size={wp(7)}
                color={"white"}
              /> */}
              <View
                style={{
                  // backgroundColor: "red",
                  marginVertical: hp(0.5),
                }}
              >
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  {`Ejercicio ${item.ejercicioRutina.nombre}`}
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  {`Series: x${item.series} Repeticiones x${item.repeticiones}`}
                </Text>
              </View>
            </View>
          ))}
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
