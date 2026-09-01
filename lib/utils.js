// ─── UTILIDADES PURAS ────────────────────────────────────────────────────────

/**
 * Días restantes hasta una fecha ISO (negativo = ya pasó).
 * @param {string} fecha  "YYYY-MM-DD"
 * @returns {number}
 */
/**
 * Parsea una fecha ISO "YYYY-MM-DD" sin offset de zona horaria.
 * Evita el bug donde new Date("2026-07-10") devuelve el día anterior en UTC-3.
 * @param {string} fechaISO
 * @returns {Date}
 */
export function parseFecha(fechaISO) {
  const [a, m, d] = fechaISO.split("-").map(Number);
  return new Date(a, m - 1, d);
}

export function getDiasRestantes(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const target = parseFecha(fecha);
  return Math.ceil((target - hoy) / 86_400_000);
}

/**
 * Nombre del día de hoy en español.
 * @returns {"Lunes"|"Martes"|"Miércoles"|"Jueves"|"Viernes"|"Sábado"|"Domingo"}
 */
export function getTodayName() {
  const map = {
    0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles",
    4: "Jueves",  5: "Viernes", 6: "Sábado",
  };
  return map[new Date().getDay()];
}

/**
 * Suma total de horas de estudio de toda la semana.
 * @param {object} estudio  { "Lunes": { "Materia": horas, … }, … }
 * @returns {number}
 */
export function getTotalEstudio(estudio) {
  const total = Object.values(estudio)
    .flatMap(dia => Object.values(dia))
    .reduce((a, b) => a + b, 0);
  return parseFloat(total.toFixed(1));
}

/**
 * Horas de estudio acumuladas por materia en toda la semana.
 * @param {object} estudio
 * @returns {{ [materia: string]: number }}
 */
export function getHorasPorMateria(estudio) {
  const result = {};
  Object.values(estudio).forEach(dia => {
    Object.entries(dia).forEach(([materia, horas]) => {
      result[materia] = (result[materia] || 0) + horas;
    });
  });
  return result;
}

/**
 * Suma de horas de estudio de un día específico.
 * @param {object} estudio
 * @param {string} dia
 * @returns {number}
 */
export function getHorasDia(estudio, dia) {
  if (!estudio[dia]) return 0;
  return parseFloat(
    Object.values(estudio[dia]).reduce((a, b) => a + b, 0).toFixed(1)
  );
}
