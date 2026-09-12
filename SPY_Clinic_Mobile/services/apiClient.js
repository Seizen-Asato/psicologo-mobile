export async function fetchApi(url, option = {}) {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Detalle del backend:", errorData);
      throw new Error(`Error ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al llamar a la API:", error);

    throw error;
  }
}
