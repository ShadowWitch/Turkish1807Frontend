import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { themeColors } from "../../styles/colors.style";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export const SigninScreen = () => {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { navigate } = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "white",
        // backgroundColor: "red",

        flex: 3,
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* <Text>qweqe</Text> */}

      <View
        style={{
          //   backgroundColor: "green",
          //   flex: 3,
          justifyContent: "center",
          position: "absolute",
          top: 0,
          marginTop: hp(5),
        }}
      >
        <Image
          style={{
            height: hp(15),
            width: width,
            // backgroundColor: "red",
          }}
          source={require("../../../assets/images/karrakdark.svg")}
          contentFit="contain"
          transition={1000}
        />
      </View>

      <View
        style={
          {
            //   backgroundColor: "red",
          }
        }
      >
        <Text
          style={{
            fontFamily: "Barlow-Regular",
            fontWeight: "bold",
            fontSize: 48,
          }}
        >
          Iniciar Sesión
        </Text>
        <Input
          //   text="Usuario"
          height={60}
          width={width}
          placeholder="Nombre de Usuario"
        />

        <Input
          //   text="Usuario"
          height={60}
          width={width}
          placeholder="Contraseña"
          showIcon
        />

        <Text
          style={{
            //   backgroundColor: "red",
            fontFamily: "Barlow-Regular",
            color: "#1A1A1A",
            textAlign: "right",
            marginTop: 15,
          }}
        >
          ¿Has olvidado tu contraseña?
        </Text>

        <Button
          buttonType="primary"
          text="Continuar"
          height={hp(10)}
          marginTop={30}
          onPress={() => navigate("Home")}
        />
      </View>

      <View
        style={{
          //   backgroundColor: "red",
          height: hp(10),
          width: width,
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#AAAAAA",
            fontSize: 16,
            fontFamily: "Barlow-Regular",
          }}
        >
          v1.0.0
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  background: {
    backgroundColor: themeColors.primary,
    flex: 1,
    justifyContent: "center",
  },
});
