import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getAll() {
  return await fetchApi(`${BASE_URL}/paciente`);
}

export async function getById(id) {
  console.log("🔎 getById de paciente recibió:", id);
  return await fetchApi(`${BASE_URL}/paciente/${id}`);
}

export async function create(data) {
  return await fetchApi(`${BASE_URL}/paciente`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function update(data, id) {
  return await fetchApi(`${BASE_URL}/paciente/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return await fetchApi(`${BASE_URL}/paciente/${id}`, {
    method: "DELETE",
  });
}
