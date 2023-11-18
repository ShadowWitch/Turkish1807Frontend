import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { EjerciciosScreen } from "../screens/Ejercicios/EjerciciosScreen";
import { ClientesScreen } from "../screens/Clientes/ClientesScreen";
import { RutinasScreen } from "../screens/Rutinas/RutinasScreen";
import { ChequeosScreen } from "../screens/Chequeos/ChequeosScreen";
import { ContratoScreen } from "../screens/Contrato/ContratoScreen";
import { DetallesScreen } from "../screens/Detalles/DetallesScreen";
import { TopTabNavigatorClientes } from "./TopTabNavigatorClientes";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: "#16213E",
        // },

        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EjerciciosScreen" component={EjerciciosScreen} />
      <Stack.Screen name="RutinasScreen" component={RutinasScreen} />
      <Stack.Screen name="ChequeosScreen" component={ChequeosScreen} />

      <Stack.Screen name="ContratoScreen" component={ContratoScreen} />

      <Stack.Screen name="DetallesScreen" component={DetallesScreen} />

      <Stack.Screen
        name="TopTabNavigatorClientes"
        component={TopTabNavigatorClientes}
      />
    </Stack.Navigator>
  );
};
