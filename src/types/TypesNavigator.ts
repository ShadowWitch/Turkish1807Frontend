import { StackScreenProps } from "@react-navigation/stack";
import { ResponseListaClientes } from "../services/clientesService";

export type TypesNavigator = {
  HomeScreen: undefined;
  EjerciciosScreen: undefined;
  ClientesScreen: undefined;
  RutinasScreen: undefined;
  ChequeosScreen: {
    id_cliente: string;
  };
  ContratoScreen: {
    id_cliente: string;
  };
  DetallesScreen: ResponseListaClientes;
};

export interface PropsWithNavigator
  extends StackScreenProps<TypesNavigator, any> {}
