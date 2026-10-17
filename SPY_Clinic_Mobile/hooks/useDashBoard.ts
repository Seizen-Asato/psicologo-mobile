import { AttendanceStatsDto } from "@/models/DashBoardDto";
import * as TurnoService from "@/services/TurnoService";
import { useEffect, useState } from "react";

export function useDashboard(anio: number, mes: number) {
  const [stats, setStats] = useState<AttendanceStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await TurnoService.getAttendance(anio, mes);
        setStats(data);
      } catch (err: any) {
        setError("Error al cargar estadísticas");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [anio, mes]);

  return { stats, loading, error };
}
