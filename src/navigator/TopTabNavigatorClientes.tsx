import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ListaClientesScreen } from "../screens/Clientes/ListaClientesScreen";
import { RegistrarClientesScreen } from "../screens/Clientes/RegistrarClientesScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SafeAreaView, Platform } from "react-native";
import { stylesButton } from "../globalStyles/buttons.styles";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProtectedComponent } from "../components/ProtectedComponent";

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigatorClientes = () => {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        // tabBarOptions={{
        //   labelStyle: {
        //     fontSize: 16, // Ajusta el tamaño de la fuente
        //   },
        //   style: {
        //     backgroundColor: "white", // Ajusta el color de fondo
        //   },
        // }}

        sceneContainerStyle={{
          backgroundColor: "#16213E",
        }}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: wp(3),
            // fontWeight: "600",
            marginTop: Platform.OS !== "ios" ? top : hp(1),
          },

          tabBarStyle: {
            // backgroundColor: "red",
          },
        }}
      >
        <Tab.Screen
          name="RegistrarClientesScreen"
          component={RegistrarClientesScreen}
          options={{
            title: "Registrar Cliente",
          }}
        />

        <Tab.Screen
          name="ListaClientesScreen"
          component={ListaClientesScreen}
          options={{
            title: "Lista de Clientes",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
