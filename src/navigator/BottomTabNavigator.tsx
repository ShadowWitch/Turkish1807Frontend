import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ConfiguracionScreen } from "../screens/ConfiguracionScreen";
import { StackNavigator } from "./StackNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={(props) => ({
        headerStyle: {
          backgroundColor: "green",
        },

        headerShown: false,

        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string = "";
          switch (props.route.name) {
            case "Home":
              iconName = "home-outline";
              break;

            case "Configuracion":
              iconName = "cog-outline";
              break;
          }

          return <Ionicons name={iconName as any} size={wp(7)} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "Inicio",
          tabBarLabelStyle: {
            fontSize: wp(3.5),
          },
        }}
        component={StackNavigator}
      />
      <Tab.Screen
        name="Configuracion"
        options={{
          title: "Configuración",
          tabBarLabelStyle: {
            fontSize: wp(3.5),
          },
        }}
        component={ConfiguracionScreen}
      />
    </Tab.Navigator>
  );
};
