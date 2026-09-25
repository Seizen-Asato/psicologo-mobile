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
  const payload = {
    ...data,
    horaInicio:
      data.horaInicio.length === 5 ? `${data.horaInicio}:00` : data.horaInicio,
    horaFin: data.horaFin.length === 5 ? `${data.horaFin}:00` : data.horaFin,
  };
  return fetchApi(`${BASE_URL}/agenda`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function update(data) {
  const payload = {
    ...data,
    horaInicio:
      data.horaInicio.length === 5 ? `${data.horaInicio}:00` : data.horaInicio,
    horaFin: data.horaFin.length === 5 ? `${data.horaFin}:00` : data.horaFin,
  };

  return fetchApi(`${BASE_URL}/agenda`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_URL}/agenda/${id}`, {
    method: "DELETE",
  });
}
