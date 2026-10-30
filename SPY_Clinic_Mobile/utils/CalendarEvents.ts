import { AgendaDto } from "@/models/AgendaDto";

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: AgendaDto;
}

const firstValue = (item: any, keys: string[], fallback = "") =>
  keys
    .map((key) => item?.[key])
    .find((value) => value !== undefined && value !== null && value !== "") ??
  fallback;

const toDate = (dateStr: string, timeStr?: string) => {
  if (!dateStr) return null;

  const fechaLimpia =
    typeof dateStr === "string" ? dateStr.split("T")[0] : dateStr;

  const dateTimeString = timeStr ? `${fechaLimpia}T${timeStr}` : fechaLimpia;

  const date = new Date(dateTimeString);

  return Number.isNaN(date.getTime()) ? null : date;
};

export function toCalendarEvents(
  appointments: AgendaDto[] = [],
): CalendarEvent[] {
  return appointments.flatMap((appointment, index) => {
    const date = firstValue(appointment, ["fecha"]);

    const startTime = firstValue(appointment, ["horaInicio"]);

    const endTime = firstValue(appointment, ["horaFin"]);

    const start = toDate(date, startTime);
    const end = toDate(date, endTime);

    if (!start || !end) return [];

    return [
      {
        id: appointment.agendaId ?? index,

        title: String(appointment.titulo ?? "Agenda"),

        start,
        end,

        resource: appointment,
      },
    ];
  });
}
