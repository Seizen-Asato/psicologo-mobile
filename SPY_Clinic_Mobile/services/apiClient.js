import * as SecureStore from "expo-secure-store";

export async function fetchApi(url, options = {}) {
  try {
    const token = await SecureStore.getItemAsync("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    console.log("REQUEST", {
      url,
      method: options?.method,
    });
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
    const message = error?.message?.includes("Network request failed")
      ? `No se pudo conectar a ${url} — verificá que la API esté corriendo y que services/baseUrl.js apunte a la IP correcta de la PC.`
      : error.message;
    console.error("❌ Error al llamar a la API:", message);
    throw new Error(message);
  }
}
