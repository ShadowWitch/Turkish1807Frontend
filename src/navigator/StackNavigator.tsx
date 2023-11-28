import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { EjerciciosScreen } from "../screens/Ejercicios/EjerciciosScreen";
import { RutinasScreen } from "../screens/Rutinas/RutinasScreen";
import { ChequeosScreen } from "../screens/Chequeos/ChequeosScreen";
import { ContratoScreen } from "../screens/Contrato/ContratoScreen";
import { DetallesScreen } from "../screens/Detalles/DetallesScreen";
import { TopTabNavigatorClientes } from "./TopTabNavigatorClientes";
import { AuthScreen } from "../screens/AuthScreen";
import { useAuth } from "../context/AuthContext";
import { LoadingAuth } from "../screens/LoadingAuth";
import { BottomTabNavigator } from "./BottomTabNavigator";
import Toast from "react-native-toast-message";
import { ListaContratoScreen } from "../screens/Contrato/ListaContratoScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Stack = createStackNavigator();

export const StackNavigator = () => {
  const { isLoading, status, token, user, setIsAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: "#16213E",
        // },

        cardStyle: {
          backgroundColor: "#16213E",
          paddingTop: hp(3),
        },

        headerShown: false,
      }}
    >
      {status !== "authenticated" ? (
        <>
          {/* <Stack.Screen name="LoadingAuth" component={LoadingAuth} /> */}
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="EjerciciosScreen" component={EjerciciosScreen} />
          <Stack.Screen name="RutinasScreen" component={RutinasScreen} />
          <Stack.Screen name="ChequeosScreen" component={ChequeosScreen} />

          <Stack.Screen name="ContratoScreen" component={ContratoScreen} />

          <Stack.Screen name="DetallesScreen" component={DetallesScreen} />

          <Stack.Screen
            name="ListaContratoScreen"
            component={ListaContratoScreen}
          />

          <Stack.Screen
            name="TopTabNavigatorClientes"
            component={TopTabNavigatorClientes}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
