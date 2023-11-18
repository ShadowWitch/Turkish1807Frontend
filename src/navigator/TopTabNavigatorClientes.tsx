import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ListaClientesScreen } from "../screens/Clientes/ListaClientesScreen";
import { RegistrarClientesScreen } from "../screens/Clientes/RegistrarClientesScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SafeAreaView } from "react-native";
import { stylesButton } from "../globalStyles/buttons.styles";

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

        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "600",
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
