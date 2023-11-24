import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlBase = "http://192.168.0.14:3000";

const setAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    console.log("TOKEN >> ", token);

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  } catch (error: any) {
    console.error("Error al obtener el token de AsyncStorage:", error.message);
  }
};

// TODO lmoya me quede por aca tengo que ver por que no llega el token en el REQ a la primera vez...

export const api = axios.create({
  baseURL: urlBase,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const test = await setAuthToken();
    console.log("TEST >> ", test);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
