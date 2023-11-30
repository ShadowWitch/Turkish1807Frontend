import React, { useState } from "react";
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
import { stylesButton } from "../../globalStyles/buttons.styles";
import { ModalRutina } from "../../components/ModalRutina";
import { useForm } from "react-hook-form";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const DetallesScreen = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { params } = route as never;
  const data: ResponseListaClientes = params;

  console.log("ACA >> ", JSON.stringify(data, null, 3));

  const chequeoAnteriorPeso = parseFloat(
    data.chequeos.at(-2)?.peso || "0"
  ).toFixed() as never;
  const chequeoActualPeso = parseFloat(
    data.chequeos.at(-1)?.peso || "0"
  ).toFixed() as never;
  const resultadoPeso = chequeoActualPeso - chequeoAnteriorPeso;

  const chequeoAnteriorGrasa = parseFloat(
    data.chequeos.at(-2)?.nivelDeGrasa || "0"
  ).toFixed() as never;
  const chequeoActualGrasa = parseFloat(
    data.chequeos.at(-1)?.nivelDeGrasa || "0"
  ).toFixed() as never;
  const resultadoGrasa = chequeoActualGrasa - chequeoAnteriorGrasa;

  const chequeoAnteriorMasa = parseFloat(
    data.chequeos.at(-2)?.nivelDeMasa || "0"
  ).toFixed() as never;
  const chequeoActualMasa = parseFloat(
    data.chequeos.at(-1)?.nivelDeMasa || "0"
  ).toFixed() as never;
  const resultadoMasa = chequeoActualMasa - chequeoAnteriorMasa;

  const fechaChequeoAnterior = data.chequeos.at(-2)?.fechaDelChequeo;
  const fechaChequeoActual = data.chequeos.at(-1)?.fechaDelChequeo;

  const fechaContratoAnterior = data.contratos.at(-2)?.fechaDelContrato;
  const fechaContratoActual = data.contratos.at(-1)?.fechaDelContrato;

  console.log("DATA CLIENTE CONTRAT O >> ", JSON.stringify(data, null, 3));

  console.log("RESULTADO >> ", typeof resultadoPeso);

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

  const onSubmit = () => {
    // console.log("DATA >> ", JSON.stringify(data, null, 3));
    // console.log("qweqwe");
    // mutate(data);

    setShowModal(true);
  };

  const onConfirm = () => {
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

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

      {/* <View
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
      </View> */}

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
              color:
                resultadoPeso < 0
                  ? stylesButton.buttonsColorSecondary.backgroundColor
                  : stylesButton.buttonsColorPrimary.backgroundColor,
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
              color:
                resultadoMasa < 0
                  ? stylesButton.buttonsColorSecondary.backgroundColor
                  : stylesButton.buttonsColorPrimary.backgroundColor,
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
              color:
                resultadoGrasa < 0
                  ? stylesButton.buttonsColorSecondary.backgroundColor
                  : stylesButton.buttonsColorPrimary.backgroundColor,
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
          // flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            width: wp(90),
            flexDirection: "row",
            justifyContent:
              data.contratos.length === 0 ? "space-between" : "center",
          }}
        >
          {data.contratos.length === 0 && (
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
          )}

          <Button
            width={wp(40)}
            buttonType="primary"
            text="Nuevo Chequeo"
            onPress={() =>
              navigation.navigate("ChequeosScreen", {
                id_cliente: data.id,
              })
            }
          />
        </View>

        <View
          style={{
            width: wp(90),
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: hp(2),
            // backgroundColor: "red",
            flexDirection: "row",
          }}
        >
          <Button
            width={wp(40)}
            buttonType="primary"
            text="Agregar Rutina"
            onPress={onSubmit}
          />

          <Button
            width={wp(40)}
            buttonType="primary"
            text="Ver progreso"
            onPress={() =>
              navigation.navigate("ProgresoScreen", {
                id_cliente: data.id,
                chequeos: data.chequeos,
              })
            }
          />
          {showModal && (
            <ModalRutina
              onAccept={handleSubmit(onConfirm)}
              onCancel={onCancel}
              showModal={showModal}
              setShowModal={setShowModal}
              title="Confirmación"
              description="¿Esta seguro que desea confirmar? Una vez hecho no podra revertirlo."
              id_cliente={data.id}
              navigation={navigation}
            />
          )}
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
