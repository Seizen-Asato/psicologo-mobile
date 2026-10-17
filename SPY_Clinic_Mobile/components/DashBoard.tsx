import { useDashboard } from "@/hooks/useDashBoard";

interface DashboardProps {
  anio: number;
  mes: number;
}

export default function Dashboard({ anio, mes }: DashboardProps) {
  const { stats, loading, error } = useDashboard(anio, mes);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>{error}</p>;
  if (!stats) return <p>No hay datos disponibles</p>;

  return (
    <div>
      <h2>
        Asistencias - {mes}/{anio}
      </h2>
      <p>Total de turnos: {stats.totalTurnos}</p>
      <p>Presentes: {stats.presentes}</p>
      <p>Ausentes: {stats.ausentes}</p>
      <p>Porcentaje de asistencia: {stats.porcentajeAsistencia}%</p>
    </div>
  );
}
