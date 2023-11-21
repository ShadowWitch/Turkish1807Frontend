import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ButtonBack } from "../../components/ButtonBack";
import { Background } from "../../components/Background";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ResponseListaClientes } from "../../services/clientesService";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const DetallesScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const data: ResponseListaClientes = params;

  const chequeoAnterior = parseFloat(
    data.chequeos.at(1)?.peso || "0"
  ).toFixed();
  const chequeoActual = parseFloat(data.chequeos.at(0)?.peso || "0").toFixed();

  const resultado = chequeoActual - chequeoAnterior;

  console.log("RESULTADO >> ", resultado);

  console.log("PARAMS >> ", JSON.stringify(data, null, 3));
  return (
    <Background>
      <ButtonBack />

      <View
        style={{
          // backgroundColor: "yellow",
          marginTop: hp(10),
          flexDirection: "row",
        }}
      >
        <Ionicons
          style={{
            marginHorizontal: wp(2),
          }}
          name={"leaf"}
          size={hp(5)}
          color={"white"}
        />
        <View
          style={{
            // backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Peso Anterior: {chequeoAnterior || "N/A"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Peso Actual: {chequeoActual}
          </Text>
          <Text
            style={{
              ...styles.styleText,
              fontWeight: "bold",
            }}
          >
            Perdida / Ganancia: {resultado}
          </Text>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "yellow",
          marginTop: hp(2),
          flexDirection: "row",
        }}
      >
        <Ionicons
          style={{
            marginHorizontal: wp(2),
          }}
          name={"body"}
          size={hp(5)}
          color={"white"}
        />
        <View
          style={{
            // backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Peso Anterior: {chequeoAnterior || "N/A"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Peso Actual: {chequeoActual}
          </Text>
          <Text
            style={{
              ...styles.styleText,
              fontWeight: "bold",
            }}
          >
            Perdida / Ganancia: {resultado}
          </Text>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  styleText: {
    fontSize: wp(4.5),
    color: "white",
  },
});
