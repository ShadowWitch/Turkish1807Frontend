import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Background } from "../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ItemMenuHome } from "../components/ItemMenuHome";
import { Image } from "expo-image";

interface IOptions {
  url: string;
  text: string;
  icon: string;
  colorIcon?: string;
  size?: number;
}

export const HomeScreen = () => {
  const windowHeight = useWindowDimensions().height;

  return (
    <Background>
      <Image
        style={{
          height: windowHeight * 0.2,
          width: "100%",
          marginBottom: 20,
          //   backgroundColor: "#0553",
          marginTop: 15,
        }}
        source="https://images.vexels.com/media/users/3/153334/isolated/preview/cf5ff26985a46460a5a29aa9443cb323-logotipo-de-sitamet-power-gym.png"
        contentFit="scale-down"
        transition={1000}
      />

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
