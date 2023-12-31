import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SchemaLogin, SchemaRecuperarContrasena } from "../types/TypesAuth";
import { api } from "../api";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchemaRegisterUser } from "../types/TypeRegisterUser";

export const signIn = async (dataBody: SchemaLogin) => {
  try {
    const { data }: AxiosResponse = await api.post("/auth/login", dataBody);

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const recuperarContrasena = async ({
  email,
}: SchemaRecuperarContrasena) => {
  try {
    const { data }: AxiosResponse = await api.get(
      `/control-usuarios/users/recuperar/${email}`
    );

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

interface RequestRegisterUser {
  nombre: string;
  contrasena: string;
  // correoElectronico: string;
}

export const registerUser = async (dataBody: SchemaRegisterUser) => {
  try {
    const { data }: AxiosResponse = await api.post("/auth/register", dataBody);

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async (token: string | null) => {
  try {
    if (!token) throw new Error("error");
    const { data }: AxiosResponse = await api.get(`/auth/check?token=${token}`);

    console.log("DATA >> ", data);
    if (!data) throw new Error("Error");
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signOff = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
