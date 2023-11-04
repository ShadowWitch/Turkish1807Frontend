import React from "react";
import { View, Text } from "react-native";
import { Background } from "../../components/Background";
import { FormChequeoCliente } from "../../components/forms/FormChequeoCliente";
import { StackScreenProps } from "@react-navigation/stack";
import { PropsWithNavigator, TypesNavigator } from "../../types/TypesNavigator";

export const ChequeosScreen = ({ navigation, route }: PropsWithNavigator) => {
  return (
    <Background>
      <FormChequeoCliente navigation={navigation} route={route} />
    </Background>
  );
};
