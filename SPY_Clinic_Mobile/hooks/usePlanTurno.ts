import {
  create,
  getAll,
  remove,
} from "@/services/PlanTurnoService";
import { type CreatePlanTurnoPayload, type PlanTurno, type ServiceResult } from "@/models/PlanTurnoDto";
import { useCallback, useEffect, useState } from "react";

export function usePlanTurno() {
  const [planes, setPlanes] = useState<PlanTurno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAll();
      setPlanes(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al obtener los planes de turno");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanes();
  }, [fetchPlanes]);

  const createPlan = async (
    formData: CreatePlanTurnoPayload,
  ): Promise<ServiceResult> => {
    try {
      const nuevoPlan = await create(formData);
      setPlanes((prev) => [...prev, nuevoPlan]);
      return { success: true, data: nuevoPlan };
    } catch (err: any) {
      return { success: false, error: err.message || "Error al crear el plan" };
    }
  };

  const deletePlan = async (
    id: string | number,
  ): Promise<Omit<ServiceResult, "data">> => {
    try {
      await remove(id);
      setPlanes((prev) =>
        prev.filter(
          (pl) =>
            String(
              (pl as any).planTurnoId ?? (pl as any).id ?? (pl as any)._id,
            ) !== String(id),
        ),
      );
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Error al eliminar el plan",
      };
    }
  };

  return {
    planes,
    loading,
    error,
    fetchPlanes,
    createPlan,
    deletePlan,
  };
}
