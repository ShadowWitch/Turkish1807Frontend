import React from "react";
import { Background } from "../../components/Background";
import { FormRegistrarCliente } from "../../components/forms/FormRegistrarCliente";
import { StackScreenProps } from "@react-navigation/stack";
import { TypesNavigator } from "../../types/TypesNavigator";
import { ListaClientes } from "../../components/clientes/ListaClientes";

interface Props extends StackScreenProps<TypesNavigator, any> {}

export const ClientesScreen = ({ navigation, route }: Props) => {
  return (
    <Background>
      {/* <FormRegistrarCliente navigation={navigation} route={route} /> */}

      {/* // TODO Me quede por ver el tema del chequeo a la hora de registrar un cliente ya que tengo que registrarle el peso, grasa, etc... */}

      <ListaClientes />
    </Background>
  );
};
