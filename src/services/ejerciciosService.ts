import { AxiosResponse } from "axios";
import { api } from "../api";
import { SchemaRegisterEjercicio } from "../types/TypesEjercicio";
import { TypeSelect } from "../types/TypeSelect";

export const listaTipoEjercicios = async () => {
  try {
    const { data }: AxiosResponse = await api.get(
      "/ejercicio/tipo-ejercicios-show-all"
    );

    if (!data) throw new Error("Error");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const registrarEjercicioService = async (
  dataBody: SchemaRegisterEjercicio
) => {
  try {
    console.log("DAT OBYU >> ", JSON.stringify(dataBody, null, 3));

    const { data }: AxiosResponse = await api.post(
      "/ejercicio/ejercicios-add",
      dataBody
    );

    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};
