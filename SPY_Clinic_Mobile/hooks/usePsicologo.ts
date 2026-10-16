import { PsicologoDto } from "@/models/PsicolgoDto";
import * as psicologoService from "@/services/PsicologoService";
import { useEffect, useState } from "react";

export function usePsicologo() {
  const [psicologos, setPsicologos] = useState<PsicologoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await psicologoService.getAll();
      setPsicologos(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al obtener psicólogos");
    } finally {
      setLoading(false);
    }
  };

  const create = async (dto: PsicologoDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await psicologoService.create(dto);
      setPsicologos((prev) => [...prev, result]);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, dto: PsicologoDto) => {
    try {
      const result = await psicologoService.update(id, dto);
      setPsicologos((prev) =>
        prev.map((p) => (Number(p.psicologoId) === id ? result : p)),
      );
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await psicologoService.remove(id);
      setPsicologos((prev) => prev.filter((p) => Number(p.psicologoId) !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { psicologos, loading, error, fetchAll, create, update, remove };
}
