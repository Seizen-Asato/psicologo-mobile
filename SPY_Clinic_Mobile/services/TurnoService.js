import { fetchApi } from "./apiClient";
import { BASE_URL } from "./baseUrl";

export async function getByRange(desde, hasta) {
  return fetchApi(`${BASE_URL}/api/turnos?desde=${desde}&hasta=${hasta}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}`);
}

export async function getPacienteByTurno(id) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}/paciente`);
}

export async function getTurnosByPaciente(id, pacienteId) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}/paciente/${pacienteId}`);
}

export async function create(data) {
  return fetchApi(`${BASE_URL}/api/turnos`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateEstado(id, estado) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}/estado`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });
}

export async function updateByPaciente(pacienteId, data) {
  return fetchApi(`${BASE_URL}/api/turnos/paciente/${pacienteId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/api/turnos/${id}`, {
    method: "DELETE",
  });
}
