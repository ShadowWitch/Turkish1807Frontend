import React from "react";
import { Background } from "../../components/Background";
import { FormRegistrarCliente } from "../../components/forms/FormRegistrarCliente";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const ClientesScreen = ({ navigation, route }: Props) => {
  return (
    <Background marginTop={0}>
      <FormRegistrarCliente navigation={navigation} route={route} />

      {/* <ListaClientes /> */}
      {/* <FormChequeoCliente /> */}
    </Background>
  );
};
