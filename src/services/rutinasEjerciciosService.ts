import { AxiosResponse } from "axios";
import { api } from "../api";
import {
  SchemaAsignarEjercicioRutina,
  SchemaAsignarRutinaCliente,
  SchemaRegisterRutina,
} from "../types/TypesRutinasEjercicios";

export const registrarRutinaService = async (
  dataBody: SchemaRegisterRutina
) => {
  try {
    const { data }: AxiosResponse = await api.post("/rutina/add", dataBody);
    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

interface RequestAsignarEjercicioRutina {
  id_rutina_entrenamiento: string;
  repeticiones: string;
  series: string;
  nombre: string;
}

export const asignarEjercicioARutina = async (
  dataBody: SchemaAsignarEjercicioRutina
) => {
  try {
    const dataSend: RequestAsignarEjercicioRutina = {
      id_rutina_entrenamiento: dataBody.id_rutina_entrenamiento.value,
      repeticiones: dataBody.repeticiones,
      series: dataBody.series,
      nombre: dataBody.nombre,
    };

    const { data }: AxiosResponse = await api.post(
      "/rutina/add-ejercicio-rutina",
      dataSend
    );
    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

interface RequestAsignarRutinaCliente {
  id_cliente: string;
  id_rutina: string;
}

export const asignarRutinaACliente = async (
  dataBody: SchemaAsignarRutinaCliente
) => {
  try {
    const dataSend: RequestAsignarRutinaCliente = {
      id_cliente: dataBody.id_cliente,
      id_rutina: dataBody.id_rutina.value,
    };

    const { data }: AxiosResponse = await api.post(
      "/rutina/add-rutina-cliente",
      dataSend
    );
    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const listaRutinas = async () => {
  try {
    const { data }: AxiosResponse = await api.get("/rutina/show-all");

    if (!data) throw new Error("Error");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

// export const registrarRutinaService = async (
//     dataBody: SchemaRegisterRutina
//   ) => {
//     try {
//       const { data }: AxiosResponse = await api.post("/rutina/add", dataBody);
//       if (!data) throw new Error("Error");
//       if (!data.ok) throw new Error(data.message);

//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
