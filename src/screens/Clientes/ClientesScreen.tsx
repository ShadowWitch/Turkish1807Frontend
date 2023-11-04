import React from "react";
import { Background } from "../../components/Background";
import { FormRegistrarCliente } from "../../components/forms/FormRegistrarCliente";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const ClientesScreen = ({ navigation, route }: Props) => {
  return (
    <Background>
      <FormRegistrarCliente navigation={navigation} route={route} />
    </Background>
  );
};
