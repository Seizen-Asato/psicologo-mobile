import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getAll() {
  return fetchApi(`${BASE_URL}/agenda`);
}

export async function getByDate(date) {
  return fetchApi(`${BASE_URL}/agenda/${date}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/agenda/${id}`);
}

export async function getByPatient(id) {
  return fetchApi(`${BASE_URL}/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(`${BASE_URL}/agenda`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(data) {
  return fetchApi(`${BASE_URL}/agenda`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/agenda/${id}`, {
    method: "DELETE",
  });
}
