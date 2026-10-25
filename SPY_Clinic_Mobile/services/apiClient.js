import * as SecureStore from "expo-secure-store";

export async function fetchApi(url, options = {}) {
  try {
    const token = await SecureStore.getItemAsync("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    console.log("🔍 Petición API:", options.method ?? "GET", url);
    console.trace("📍 Origen de la petición");
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("⚠️ Detalle del backend:", errorText);
      throw new Error(
        `Error ${response.status} ${response.statusText}: ${errorText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al llamar a la API:", error.message);
    throw error;
  }
}
