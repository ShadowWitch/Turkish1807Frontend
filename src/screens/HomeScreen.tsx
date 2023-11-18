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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      <Image
        style={{
          height: hp(20),
          width: wp(100),
          marginBottom: hp(3),
          //   backgroundColor: "#0553",
          marginTop: hp(1),
        }}
        source="https://images.vexels.com/media/users/3/153334/isolated/preview/cf5ff26985a46460a5a29aa9443cb323-logotipo-de-sitamet-power-gym.png"
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
    url: "TopTabNavigatorClientes",
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
