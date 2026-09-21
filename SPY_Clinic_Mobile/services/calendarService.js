import { fetchApi } from "./apiClient";

const BASE_URL = "http://192.168.100.36:5008/api/agenda"; // tu IP local

export async function getAll() {
  return fetchApi(BASE_URL);
}

export async function getByDate(date) {
  return fetchApi(`${BASE_URL}/${date}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/${id}`);
}

export async function getByPatient(id) {
  return fetchApi(`http://192.168.100.36:5008/api/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function update(data) {
  return fetchApi(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
