import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getByRange(desde, hasta) {
  return fetchApi(`${BASE_URL}/turno?desde=${desde}&hasta=${hasta}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/turno/${id}`);
}

export async function getPacienteByTurno(id) {
  return fetchApi(`${BASE_URL}/turno/${id}/paciente`);
}

export async function getTurnosByPaciente(id, pacienteId) {
  return fetchApi(`${BASE_URL}/turno/${id}/paciente/${pacienteId}`);
}

export async function create(data) {
  return fetchApi(`${BASE_URL}/turno`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_URL}/turno/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateEstado(id, estado) {
  return fetchApi(`${BASE_URL}/turno/${id}/estado`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });
}

export async function updateByPaciente(pacienteId, data) {
  return fetchApi(`${BASE_URL}/turno/paciente/${pacienteId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/turno/${id}`, {
    method: "DELETE",
  });
}
