src/
├── services/
│ └── agendaService.ts # funciones fetch: get, create, update, delete
│
├── components/
│ ├── CalendarView.tsx # renderiza el calendario con eventos
│ └── AgendaForm.tsx # formulario para crear/editar agendas
│
├── screens/
│ └── AgendaScreen.tsx # pantalla principal que combina calendario + formulario
│
├── models/
│ └── AgendaDto.ts # definición de la estructura de datos (interface/DTO)
│
└── utils/
└── dateUtils.ts # helpers para formatear fechas/horas

Flujo que sigue ahora
AgendaService.ts

Definí funciones getAgendas, createAgenda, updateAgenda, removeAgenda.

Todas tipadas con tu AgendaDto.

AgendaScreen.tsx

Usá useEffect para traer las agendas al montar la pantalla.

Guardá los datos en un useState<AgendaDto[]>.

Pasá esos datos a CalendarView.

Renderizá también AgendaForm para que el usuario pueda crear nuevas agendas.

CalendarView.tsx

Recibe eventos como props.

Usa react-big-calendar con momentLocalizer.

Muestra los eventos en el calendario.

AgendaForm.tsx

Permite ingresar datos (fecha, horaInicio, horaFin, etc.).

Al enviar, llama a agendaService.createAgenda.

Actualiza el estado en AgendaScreen para refrescar el calendario.
