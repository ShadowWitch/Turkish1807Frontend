import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  ScrollView,
} from "react-native";
import { Background } from "../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ItemMenuHome } from "../components/ItemMenuHome";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/AuthContext";
import { ButtonCloseSesion } from "../components/ButtonCloseSesion";
import { ProtectedComponent } from "../components/ProtectedComponent";

interface IOptions {
  url: string;
  text: string;
  icon: string;
  colorIcon?: string;
  size?: number;
}

export const HomeScreen = () => {
  const { setIsAuthenticated } = useAuth();

  const onCloseSession = () => {
    console.log("qweqweqwe");
    setIsAuthenticated({
      token: "",
      user: null,
      status: "not-authenticated",
    });
  };

  return (
    <Background>
      <Image
        style={{
          height: hp(20),
          width: wp(100),
          marginBottom: hp(3),
          //   backgroundColor: "#0553",
          marginTop: hp(1),
        }}
        source={require("../../assets/gym.png")}
        contentFit="scale-down"
        transition={1000}
      />

      <View
        style={{
          paddingHorizontal: wp(10),
          //   marginTop: 100,
          // backgroundColor: "red",
          flex: 1,
        }}
      >
        <ScrollView>
          {options.map((e, index) => (
            <ItemMenuHome
              key={index}
              icon={e.icon}
              text={e.text}
              url={e.url}
              colorIcon={e.colorIcon}
              size={e.size}
            />
          ))}
        </ScrollView>

        {/* <Button title="Cerrar" onPress={onCloseSession} /> */}
      </View>

      <TouchableOpacity
        style={{
          // backgroundColor: "red",
          height: hp(10),
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onCloseSession}
      >
        <Ionicons name={"power-outline"} size={wp(7)} color={"white"} />

        <Text
          style={{
            color: "white",
            fontSize: wp(4),
          }}
        >
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </Background>
  );
};

const options: IOptions[] = [
  {
    text: "Clientes",
    icon: "people-outline",
    url: "TopTabNavigatorClientes",
  },
  // {
  //   text: "Chequeos",
  //   icon: "body-outline",
  //   url: "EjerciciosScreen",
  // },
  {
    text: "Contratos",
    icon: "cash-outline",
    url: "ListaContratoScreen",
  },

  // {
  //   text: "Cerrar Sesión",
  //   icon: "power-outline",
  //   url: "ListaContratoScreen",
  // },
  {
    text: "Rutinas",
    icon: "analytics-outline",
    url: "TopTabNavigatorRutinas",
    // url: "RutinasScreen",
  },

  {
    text: "Asignar Ejercicios",
    icon: "barbell-outline",
    url: "AsignarRutinasScreen",
  },

  {
    text: "Roles y Permisos",
    icon: "construct-outline",
    url: "TopTabNavigatorRoles",
  },

  // {
  //   text: "Chequeos",
  //   icon: "body-outline",
  //   url: "RutinasScreen",
  // },
];
