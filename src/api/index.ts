import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlBase = "http://192.168.0.15:3000";

const setAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // if (token) {
    //   // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //   api.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwREIiOnsiaWQiOiI1OTA5ZGI2MC05MDQyLTQzNmQtOTIzNS1jNWQ2MTFiNWVhNmUiLCJub21icmUiOiJhZG1pbiIsImNvcnJlb0VsZWN0cm9uaWNvIjoicm9zYWxlZGFya0BnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiOikiLCJ1bHRpbWFDb25leGlvbiI6IjIwMjMtMTEtMjBUMTU6MDM6NDIuMjQ1WiIsImltYWdlblBlcmZpbCI6IiIsImVzdGFkbyI6IkFjdGl2byIsImlkX3JlbF9yb2xlIjoiZjA0MDc0OGItYWE0Zi00MjA4LWFjY2UtNDYzY2NlZjM5YWY1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0yMFQxNTowMzo0Mi4yNDVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0yMFQxNTowMzo0Mi4yNDVaIiwicmVsUGVybWlzb3NSb2xlcyI6eyJpZCI6ImYwNDA3NDhiLWFhNGYtNDIwOC1hY2NlLTQ2M2NjZWYzOWFmNSIsImlkX3JvbGUiOiJiYWU1NzI0NC1jNjA1LTQ2YWEtYTRlZC1mNzE1YTkwYjRiMjgiLCJpZF9wZXJtaXNvIjoiYzM5YzI5ZTktZDU1NC00ODI4LWE2NjYtOGY4YWI1ZDNkODQ3IiwicGVybWlzb3MiOnsiaWQiOiJjMzljMjllOS1kNTU0LTQ4MjgtYTY2Ni04ZjhhYjVkM2Q4NDciLCJub21icmUiOiJBRE1JTklTVFJBRE9SIiwiZGVzY3JpcGNpb24iOiJIYWNlIGRlIHRvZG8iLCJhY2Npb25lcyI6WyIxMDAxIiwiMTAwMiIsIjEwMDMiXSwiY3JlYXRlZEF0IjoiMjAyMy0xMS0yMFQxNTowMzo0Mi4yMzRaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0yMFQxNTowMzo0Mi4yMzRaIn0sInJvbGVzIjp7ImlkIjoiYmFlNTcyNDQtYzYwNS00NmFhLWE0ZWQtZjcxNWE5MGI0YjI4Iiwibm9tYnJlIjoiQURNSU5JU1RSQURPUiIsImRlc2NyaXBjaW9uIjoiSGFjZSBkZSB0b2RvIn19fSwiaWF0IjoxNzAxMTE1OTUzLCJleHAiOjE3MDExNTE5NTN9.wz1eDBzO7illlfH31_WGfgGC9aoaczbOrVBMH6l5IzI`;
    // } else {
    //   delete api.defaults.headers.common["Authorization"];
    // }
  } catch (error: any) {
    console.error("Error al obtener el token de AsyncStorage:", error.message);
  }
};

export const api = axios.create({
  baseURL: urlBase,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const test = await setAuthToken();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
