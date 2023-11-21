import { StackScreenProps } from "@react-navigation/stack";
import { ResponseListaClientes } from "../services/clientesService";

export type TypesNavigator = {
  HomeScreen: undefined;
  EjerciciosScreen: undefined;
  ClientesScreen: undefined;
  RutinasScreen: undefined;
  ChequeosScreen: undefined;
  ContratoScreen: undefined;
  DetallesScreen: ResponseListaClientes;
};

export interface PropsWithNavigator
  extends StackScreenProps<TypesNavigator, any> {}
