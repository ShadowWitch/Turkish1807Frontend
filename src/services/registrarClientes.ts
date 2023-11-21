import { AxiosResponse } from "axios";
import { SchemaRegisterCliente } from "../types/TypesClientes";
import { api } from "../api";
import { formatearFecha } from "../utils/formatDate";

export const registrarClienteService = async (
  dataBody: SchemaRegisterCliente
) => {
  try {
    const sendData: RequestRegisterCliente = {
      DNI: dataBody.DNI,
      fechaDeIngreso: formatearFecha(new Date()),
      estatura: dataBody.estatura,
      telefono: dataBody.telefono,
      primerNombre: dataBody.nombreCompleto.split(" ")[0] || "",
      segundoNombre: dataBody.nombreCompleto.split(" ")[1] || "",
      primerApellido: dataBody.nombreCompleto.split(" ")[2] || "",
      segundoApellido: dataBody.nombreCompleto.split(" ")[3] || "",
      otroNombre: dataBody.nombreCompleto.split(" ")[4] || "",
      fechaDelChequeo: formatearFecha(new Date()),
      fechaNacimiento: formatearFecha(new Date()),
      nivelDeGrasa: dataBody.nivelDeGrasa,
      nivelDeMasa: dataBody.nivelDeMasa,
      peso: dataBody.peso,
    };

    console.log("SEND DATA >> ", JSON.stringify(sendData, null, 3));
    const { data }: AxiosResponse = await api.post("/clientes/add", sendData);

    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};
interface RequestRegisterCliente {
  DNI: string;
  fechaDeIngreso: string;
  fechaNacimiento: string;
  otroNombre: string;
  primerApellido: string;
  primerNombre: string;
  segundoApellido: string;
  segundoNombre: string;
  telefono: string;
  estatura: string;
  fechaDelChequeo: string;
  nivelDeGrasa: string;
  nivelDeMasa: string;
  peso: string;
}
