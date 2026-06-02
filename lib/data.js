// ─── CONSTANTES GLOBALES ─────────────────────────────────────────────────────

export const DAYS       = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const SHORT_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const META_HORAS_SEMANALES = 35;

// Colores por materia — coinciden con el horario de la facultad
export const MATERIAS_COLORS = {
  "Análisis de Sistemas de Información": "#4ade80",  // verde
  "Física II": "#93c5fd",  // azul
  "Comunicación de Datos": "#f0abfc",  // rosa/violeta
  "Análisis Matemático II": "#cbd5e1",  // gris azulado
};

// ─── HORARIO REAL (UTN · 2K9 / 2K10 / 3K6 · 2026) ───────────────────────────

export const initialClases = [
  { id: 1, materia: "Análisis de Sistemas de Información", dia: "Lunes", inicio: "17:20", fin: "19:45", aula: "229", comision: "2K9",  cargaHs: 2.4 },
  { id: 2, materia: "Física II", dia: "Martes", inicio: "17:20", fin: "19:45", aula: "229", comision: "2K9",  cargaHs: 2.4 },
  { id: 3, materia: "Comunicación de Datos", dia: "Miércoles", inicio: "17:20", fin: "19:00", aula: "610", comision: "3K6",  cargaHs: 1.7 },
  { id: 4, materia: "Física II", dia: "Miércoles", inicio: "19:00", fin: "20:40", aula: "226", comision: "2K9",  cargaHs: 1.7 },
  { id: 5, materia: "Análisis Matemático II", dia: "Jueves", inicio: "18:15", fin: "20:40", aula: "223", comision: "2K10", cargaHs: 2.4 },
  { id: 6, materia: "Análisis de Sistemas de Información", dia: "Jueves",    inicio: "20:40", fin: "23:05", aula: "702", comision: "2K9",  cargaHs: 2.4 },
  { id: 7, materia: "Análisis Matemático II", dia: "Viernes", inicio: "19:00", fin: "20:40", aula: "227", comision: "2K10", cargaHs: 1.7 },
  { id: 8, materia: "Comunicación de Datos", dia: "Viernes", inicio: "21:35", fin: "23:05", aula: "411", comision: "3K6",  cargaHs: 1.5 },
];

// ─── PARCIALES ────────────────────────────────────────────────────────────────

export const initialParciales = [
  { id: 1, materia: "Análisis de Sistemas de Información", fecha: "2026-07-10", tipo: "1er Parcial", estado: "pendiente", temario: "Modelado de sistemas, DFD, casos de uso" },
  { id: 2, materia: "Física II", fecha: "2026-06-24", tipo: "1er Parcial", estado: "pendiente", temario: "Campo eléctrico, Ley de Gauss, potencial" },
  { id: 3, materia: "Comunicación de Datos", fecha: "2026-07-03", tipo: "1er Parcial", estado: "pendiente", temario: "Modelo OSI, capas de enlace y red" },
  { id: 4, materia: "Análisis Matemático II", fecha: "2026-06-18", tipo: "1er Parcial", estado: "pendiente", temario: "Series, integrales dobles, ecuaciones diferenciales" },
];

// ─── TAREAS ───────────────────────────────────────────────────────────────────

export const initialTareas = [
  { id: 1, titulo: "Guía de integrales dobles — ejercicios 1–15", materia: "Análisis Matemático II",              fechaEntrega: "2026-06-08", completada: false, prioridad: "alta"  },
  { id: 2, titulo: "Informe campo eléctrico — Ley de Gauss", materia: "Física II",                           fechaEntrega: "2026-06-12", completada: false, prioridad: "alta"  },
  { id: 3, titulo: "TP DFD — Sistema de biblioteca",  materia: "Análisis de Sistemas de Información", fechaEntrega: "2026-06-20", completada: false, prioridad: "media" },
  { id: 4, titulo: "Lab Wireshark — captura TCP/IP",   materia: "Comunicación de Datos",               fechaEntrega: "2026-06-25", completada: false, prioridad: "media" },
  { id: 5, titulo: "Resumen modelo OSI por capa",   materia: "Comunicación de Datos",               fechaEntrega: "2026-07-01", completada: false, prioridad: "baja"  },
];

// ─── HORAS DE ESTUDIO (estado inicial simulado) ───────────────────────────────
// Modificar estos valores o usar los controles +/− en la vista Semana

export const initialEstudio = {
  "Lunes":     { "Análisis de Sistemas de Información": 2,   "Física II": 1.5, "Comunicación de Datos": 1,   "Análisis Matemático II": 2   },
  "Martes":    { "Análisis de Sistemas de Información": 1,   "Física II": 2.5, "Comunicación de Datos": 1.5, "Análisis Matemático II": 1.5 },
  "Miércoles": { "Análisis de Sistemas de Información": 1.5, "Física II": 1,   "Comunicación de Datos": 2,   "Análisis Matemático II": 2   },
  "Jueves":    { "Análisis de Sistemas de Información": 1,   "Física II": 1.5, "Comunicación de Datos": 1,   "Análisis Matemático II": 2.5 },
  "Viernes":   { "Análisis de Sistemas de Información": 2,   "Física II": 1,   "Comunicación de Datos": 1.5, "Análisis Matemático II": 1   },
  "Sábado":    { "Análisis de Sistemas de Información": 1.5, "Física II": 2,   "Comunicación de Datos": 1,   "Análisis Matemático II": 2   },
};
