import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getById(id) {
  return fetchApi(`${BASE_URL}/api/usuario/${id}`);
}
export async function crate(data) {
  return fetchApi(`${BASE_URL}/api/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function update(data, id) {
  return fetchApi(`${BASE_URL}/api/usuario/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function removeUser(id) {
  return fetchApi(`${BASE_URL}/api/usuario/${id}`, {
    method: "DELETE",
  });
}
