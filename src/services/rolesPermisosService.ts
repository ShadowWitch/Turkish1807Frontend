import { AxiosResponse } from "axios";
import { api } from "../api";
interface ListaPermisosResponse {
  id: string;
  nombre: string;
  descripcion: string;
  acciones: string;
  createdAt: string;
  updatedAt: string;
}

export const listaPermisos = async (): Promise<
  ListaPermisosResponse[] | undefined
> => {
  try {
    const { data }: AxiosResponse = await api.get(
      "/control-usuarios/permisos/show-all"
    );

    if (!data) throw new Error("Error");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

interface RequestRegistrarRol {
  nombre: string;
  descripcion: string;
  permisos: string[];
}

export const registrarRol = async (dataBody: RequestRegistrarRol) => {
  try {
    console.log("DATA BPDY >> ", JSON.stringify(dataBody, null, 3));
    const { data }: AxiosResponse = await api.post(
      "/control-usuarios/roles/add",
      {
        ...dataBody,
        permisos: JSON.stringify(dataBody.permisos),
      }
    );

    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};
