import * as SecureStore from "expo-secure-store";
import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function Login(email, password) {
  const data = await fetchApi(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ Email: email, PasswordHash: password }),
  });

  await SecureStore.setItemAsync("token", data.token);
  return data;
}

export async function session() {
  const token = await SecureStore.getItemAsync("token");
  return fetchApi(`${BASE_URL}/session`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
