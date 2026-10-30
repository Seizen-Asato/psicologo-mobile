import { AttendanceStatsDto } from "@/models/DashBoardDto";
import * as TurnoService from "@/services/TurnoService";
import { useCallback, useEffect, useState } from "react";

export function useDashboard(anio: number, mes: number) {
  const [stats, setStats] = useState<AttendanceStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TurnoService.getAttendance(anio, mes);
      setStats(data);
      setError(null);
    } catch (err: any) {
      setError("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  }, [anio, mes]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
