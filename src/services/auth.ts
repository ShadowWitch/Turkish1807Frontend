import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SchemaLogin } from "../types/TypesAuth";
import { api } from "../api";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (dataBody: SchemaLogin) => {
  try {
    const { data }: AxiosResponse = await api.post("/auth/login", dataBody);

    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async () => {
  try {
    const { data }: AxiosResponse = await api.get("/auth/check");

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
