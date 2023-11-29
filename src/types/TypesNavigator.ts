import { StackScreenProps } from "@react-navigation/stack";
import { ResponseListaClientes } from "../services/clientesService";

export type TypesNavigator = {
  HomeScreen: undefined;
  EjerciciosScreen: undefined;
  ClientesScreen: undefined;
};

export interface PropsWithNavigator
  extends StackScreenProps<TypesNavigator, any> {}
