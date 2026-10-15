import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getAll() {
  return await fetchApi(`${BASE_URL}/consultorio`);
}

export async function getById(id) {
  return await fetchApi(`${BASE_URL}/consultorio/${id}`);
}

export async function create(data) {
  return await fetchApi(`${BASE_URL}/consultorio`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function update(data, id) {
  return await fetchApi(`${BASE_URL}/consultorio/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return await fetchApi(`${BASE_URL}/consultorio/${id}`, {
    method: "DELETE",
  });
}
