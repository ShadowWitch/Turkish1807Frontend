import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { EjerciciosScreen } from "../screens/Ejercicios/EjerciciosScreen";
import { ClientesScreen } from "../screens/Clientes/ClientesScreen";
import { RutinasScreen } from "../screens/Rutinas/RutinasScreen";
import { ChequeosScreen } from "../screens/Chequeos/ChequeosScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "skyblue",
        },

        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EjerciciosScreen" component={EjerciciosScreen} />
      <Stack.Screen name="ClientesScreen" component={ClientesScreen} />
      <Stack.Screen name="RutinasScreen" component={RutinasScreen} />
      <Stack.Screen name="ChequeosScreen" component={ChequeosScreen} />
    </Stack.Navigator>
  );
};
