import { ConsultorioDto } from "@/models/Consultorio";
import { useState } from "react";
import * as ConsultorioService from "../services/ConsultorioService";

export function useConsultorio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consultorio, setConsultorio] = useState<ConsultorioDto[]>([]);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ConsultorioService.getAll();
      setConsultorio(Array.isArray(response) ? response : []);
    } catch (err: any) {
      setError(
        err.message || "Error al mostrar todos los consultorios registrados",
      );
    } finally {
      setLoading(false);
    }
  };

  const create = async (dto: ConsultorioDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ConsultorioService.create(dto);
      setConsultorio((prev) => [...prev, response]);
      return { success: true, data: response }; // <--- Retornamos éxito
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Error al crear el consultorio";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, dto: ConsultorioDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ConsultorioService.update(id, dto);
      setConsultorio((prev) => prev.map((c) => (c.Id === id ? response : c)));
      return { success: true, data: response }; // <--- Retornamos éxito
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Error al actualizar el consultorio";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await ConsultorioService.remove(id);
      setConsultorio((prev) => prev.filter((c) => c.Id !== id));
      return { success: true };
    } catch (err: any) {
      const message = err.message || "Error al eliminar el consultorio";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    consultorio,
    fetchAll,
    create,
    update,
    remove,
    loading,
    error,
  };
}