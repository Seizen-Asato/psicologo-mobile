import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getAll() {
  return await fetchApi(`${BASE_URL}/planTurno`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`);
}

export async function getTurnosByPaciente(id) {
  return fetchApi(`${BASE_URL}/planTurno/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(`${BASE_URL}/planTurno`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/planTurno/${id}`, {
    method: "DELETE",
  });
}
