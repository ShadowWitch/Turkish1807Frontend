import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ConfiguracionScreen } from "../screens/ConfiguracionScreen";
import { StackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "skyblue",
        },

        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Configuracion" component={ConfiguracionScreen} />
    </Tab.Navigator>
  );
};
