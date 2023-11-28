import { AxiosResponse } from "axios";
import { SchemaRegisterContrato } from "../types/TypesContrato";
import { api } from "../api";

export const addContrato = async (dataBody: SchemaRegisterContrato) => {
  try {
    const sendData: RequestRegisterContrato = {
      estado: "Activo",
      fechaDeFin: dataBody.fechaDeFin,
      fechaDeInicio: dataBody.fechaDeInicio,
      ultimaRenovacion: dataBody.fechaDeInicio,
      id_cliente: dataBody.id_cliente,
    };

    const { data }: AxiosResponse = await api.post("/contrato/add", sendData);

    console.log("DATA >> ", data);

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const renovarContrato = async (dataBody: RequestRenovarContrato) => {
  try {
    const { data }: AxiosResponse = await api.put("/contrato/renew", dataBody);

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export interface RequestRenovarContrato {
  fechaDeFin: string;
  ultimaRenovacion: string;
  id_contrato: string;
}

interface RequestRegisterContrato {
  descripcion?: string;
  estado: "Activo";
  fechaDeFin: string;
  fechaDeInicio: string;
  ultimaRenovacion: string;
  id_cliente: string;
}
