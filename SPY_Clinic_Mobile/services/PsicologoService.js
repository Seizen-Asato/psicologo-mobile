import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getAll() {
  return fetchApi(`${BASE_URL}/psicologo`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/psicologo/${id}`);
}

export async function getPacienteByTurno(id) {
  return fetchApi(`${BASE_URL}/psicologo/${id}`);
}

export async function create(data) {
  return fetchApi(`${BASE_URL}/psicologo`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_URL}/psicologo/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/psicologo/${id}`, {
    method: "DELETE",
  });
}
