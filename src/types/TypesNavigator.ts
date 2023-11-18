import { StackScreenProps } from "@react-navigation/stack";

export type TypesNavigator = {
    HomeScreen: undefined,
    EjerciciosScreen: undefined,
    ClientesScreen: undefined,
    RutinasScreen: undefined,
    ChequeosScreen: undefined,
    ContratoScreen: undefined,
    DetallesScreen: undefined
}

export interface PropsWithNavigator extends StackScreenProps<TypesNavigator, any> { }