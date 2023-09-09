import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Background } from "../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ItemMenuHome } from "../components/ItemMenuHome";

interface IOptions {
  url: string;
  text: string;
  icon: string;
  colorIcon?: string;
  size?: number;
}

export const HomeScreen = () => {
  return (
    <Background>
      <Text
        style={{
          color: "white",
          fontSize: 70,
          textAlign: "center",
        }}
      >
        Aqui ira el Logo
      </Text>

      <View
        style={{
          paddingHorizontal: 50,
          //   marginTop: 100,
          // backgroundColor: "red",
          flex: 1,
        }}
      >
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
      </View>
    </Background>
  );
};

const options: IOptions[] = [
  {
    text: "Clientes",
    icon: "people-outline",
    url: "ClientesScreen",
  },
  {
    text: "Ejercicios",
    icon: "barbell-outline",
    url: "EjerciciosScreen",
  },
  {
    text: "Rutinas",
    icon: "analytics-outline",
    url: "RutinasScreen",
  },

  {
    text: "Chequeos",
    icon: "body-outline",
    url: "RutinasScreen",
  },
];
