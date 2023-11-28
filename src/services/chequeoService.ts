import { AxiosResponse } from "axios";
import { api } from "../api";
import { SchemaRegisterChequeo } from "../types/TypesChequeo";
import { formatearFecha } from "../utils/formatDate";

export const registrarChequeoService = async (
  dataBody: SchemaRegisterChequeo
) => {
  try {
    const sendData: RequestRegistrarChequeo = {
      ...dataBody,
      fechaDelChequeo: formatearFecha(new Date()),
    };

    const { data }: AxiosResponse = await api.post("/chequeo/add", sendData);

    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

interface RequestRegistrarChequeo {
  peso: string;
  estatura: string;
  nivelDeGrasa: string;
  nivelDeMasa: string;
  fechaDelChequeo: string;
}
