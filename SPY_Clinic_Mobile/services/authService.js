import * as SecureStore from "expo-secure-store";
import { fetchApi } from "./apiClient";

const BASE_URL = "http://10.0.2.2:5008/api";
// Usa esta si pruebas con tu celular físico escaneando el QR (reemplaza con la IP de tu PC):
// const BASE_URL = "http://192.168.0.15:5008/api";

export async function Login(email, password) {
  const data = await fetchApi(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, PasswordHash: password }),
  });

  await SecureStore.setItemAsync("token", data.token);
  return data;
}

export async function session(token) {
  const data = await fetchApi(`${BASE_URL}/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
