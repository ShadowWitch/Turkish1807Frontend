import { create } from "zustand";
import { SchemaRegisterCliente } from "../types/TypesClientes";

interface IUseAuth {
  dataCliente: SchemaRegisterCliente;
  setDataCliente: (data: SchemaRegisterCliente) => void;
}
