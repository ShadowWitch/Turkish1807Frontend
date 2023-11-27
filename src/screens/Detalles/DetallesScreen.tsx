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
import { Button } from "../../components/Button";
import { formatearISO } from "../../utils/formatDate";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const DetallesScreen = ({ navigation, route }: Props) => {
  const { params } = route as never;
  const data: ResponseListaClientes = params;

  console.log("ACA >> ", JSON.stringify(data, null, 3));

  const chequeoAnteriorPeso = parseFloat(
    data.chequeos.at(1)?.peso || "0"
  ).toFixed() as never;
  const chequeoActualPeso = parseFloat(
    data.chequeos.at(0)?.peso || "0"
  ).toFixed() as never;
  const resultadoPeso = chequeoActualPeso - chequeoAnteriorPeso;

  const chequeoAnteriorGrasa = parseFloat(
    data.chequeos.at(1)?.nivelDeGrasa || "0"
  ).toFixed() as never;
  const chequeoActualGrasa = parseFloat(
    data.chequeos.at(0)?.nivelDeGrasa || "0"
  ).toFixed() as never;
  const resultadoGrasa = chequeoActualGrasa - chequeoAnteriorGrasa;

  const chequeoAnteriorMasa = parseFloat(
    data.chequeos.at(1)?.nivelDeMasa || "0"
  ).toFixed() as never;
  const chequeoActualMasa = parseFloat(
    data.chequeos.at(0)?.nivelDeMasa || "0"
  ).toFixed() as never;
  const resultadoMasa = chequeoActualMasa - chequeoAnteriorMasa;

  const fechaChequeoAnterior = data.chequeos.at(1)?.fechaDelChequeo;
  const fechaChequeoActual = data.chequeos.at(0)?.fechaDelChequeo;

  const fechaContratoAnterior = data.contratos.at(1)?.fechaDelContrato;
  const fechaContratoActual = data.contratos.at(0)?.fechaDelContrato;

  return (
    <Background>
      <ButtonBack />

      <View
        style={{
          // backgroundColor: "red",
          height: hp(10),
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp(6),
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: wp(7),
            fontWeight: "bold",
          }}
        >{`${data.primerNombre} ${data.primerApellido}`}</Text>
      </View>

      <View
        style={{
          // backgroundColor: "yellow",
          marginTop: hp(3),
          flexDirection: "row",
        }}
      >
        <Ionicons
          style={{
            marginHorizontal: wp(2),
          }}
          name={"cash-outline"}
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
            Fecha Contrato Anterior:{" "}
            {fechaContratoAnterior
              ? formatearISO(fechaContratoAnterior)
              : "No existe"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Fecha Contrato Actual:{" "}
            {fechaContratoActual
              ? formatearISO(fechaContratoActual)
              : "No existe"}
          </Text>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "yellow",
          marginTop: hp(3),
          flexDirection: "row",
        }}
      >
        <Ionicons
          style={{
            marginHorizontal: wp(2),
          }}
          name={"calendar-outline"}
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
            Fecha Chequeo Anterior:{" "}
            {fechaChequeoAnterior
              ? formatearISO(fechaChequeoAnterior)
              : "No existe"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Fecha Chequeo Actual:{" "}
            {fechaChequeoActual
              ? formatearISO(fechaChequeoActual)
              : "No existe"}
          </Text>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "yellow",
          marginTop: hp(3),
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
            Peso Anterior: {chequeoAnteriorPeso || "N/A"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Peso Actual: {chequeoActualPeso}
          </Text>
          <Text
            style={{
              ...styles.styleText,
              fontWeight: "bold",
            }}
          >
            Perdida / Ganancia: {resultadoPeso}
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
          name={"barbell"}
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
            Niv. Masa Anterior: {chequeoAnteriorMasa || "N/A"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Niv. Masa Actual: {chequeoActualMasa}
          </Text>
          <Text
            style={{
              ...styles.styleText,
              fontWeight: "bold",
            }}
          >
            Perdida / Ganancia: {resultadoMasa}
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
          name={"fast-food"}
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
            Niv. Grasa Anterior: {chequeoAnteriorGrasa || "N/A"}
          </Text>
          <Text
            style={{
              ...styles.styleText,
            }}
          >
            Niv. Grasa Actual: {chequeoActualGrasa}
          </Text>
          <Text
            style={{
              ...styles.styleText,
              fontWeight: "bold",
            }}
          >
            Perdida / Ganancia: {resultadoGrasa}
          </Text>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "red",
          alignItems: "center",
          marginTop: hp(5),
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          width={wp(40)}
          buttonType="primary"
          text="Nuevo Contrato"
          onPress={() =>
            navigation.navigate("ContratoScreen", {
              id_cliente: data.id,
            })
          }
        />
        <Button
          width={wp(40)}
          buttonType="primary"
          text="Nuevo Chequeo"
          onPress={() => navigation.navigate("ChequeosScreen")}
        />
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
