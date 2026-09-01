"use client";
import { useState } from "react";
import { MATERIAS_COLORS } from "@/lib/data";
import { getDiasRestantes, parseFecha } from "@/lib/utils";
import { MateriaBadge, PrioridadBadge, StatCard } from "@/components/ui";

export default function ViewTareas({ tareas, setTareas }) {
  const [filtro,   setFiltro]   = useState("todas");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titulo: "", materia: Object.keys(MATERIAS_COLORS)[0], fechaEntrega: "", prioridad: "media",
  });

  function toggle(id) { setTareas((p) => p.map((t) => t.id === id ? { ...t, completada: !t.completada } : t)); }
  function del(id)    { setTareas((p) => p.filter((t) => t.id !== id)); }
  function add() {
    if (!form.titulo || !form.fechaEntrega) return;
    setTareas((p) => [...p, { ...form, id: Date.now(), completada: false }]);
    setForm({ titulo: "", materia: Object.keys(MATERIAS_COLORS)[0], fechaEntrega: "", prioridad: "media" });
    setShowForm(false);
  }

  const filtered = tareas
    .filter((t) => {
      if (filtro === "pendientes")  return !t.completada;
      if (filtro === "completadas") return  t.completada;
      return true;
    })
    .sort((a, b) => {
      if (a.completada !== b.completada) return a.completada ? 1 : -1;
      return getDiasRestantes(a.fechaEntrega) - getDiasRestantes(b.fechaEntrega);
    });

  return (
    <div className="flex-col">
      {/* ── Stats ── */}
      <div className="grid-3">
        <StatCard value={tareas.filter((t) => !t.completada).length} label="Pendientes"  color="var(--color-warning)" />
        <StatCard value={tareas.filter((t) =>  t.completada).length} label="Completadas" color="var(--color-success)" />
        <StatCard value={tareas.length}                               label="Total"       color="#93c5fd"              />
      </div>

      {/* ── Filtros + botón ── */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {["todas", "pendientes", "completadas"].map((f) => (
          <button key={f} className={`filter-tab${filtro === f ? " active" : ""}`} onClick={() => setFiltro(f)}>
            {f}
          </button>
        ))}
        <button className="btn btn--primary ml-auto" onClick={() => setShowForm(!showForm)}>+ Nueva tarea</button>
      </div>

      {/* ── Formulario ── */}
      {showForm && (
        <div className="form-panel">
          <div className="form-grid">
            <input className="form-input" placeholder="Título de la tarea" value={form.titulo}
              onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))} />
            <select className="form-input" value={form.materia}
              onChange={(e) => setForm((p) => ({ ...p, materia: e.target.value }))}>
              {Object.keys(MATERIAS_COLORS).map((m) => <option key={m}>{m}</option>)}
            </select>
            <input className="form-input" type="date" value={form.fechaEntrega}
              onChange={(e) => setForm((p) => ({ ...p, fechaEntrega: e.target.value }))} />
            <select className="form-input" value={form.prioridad}
              onChange={(e) => setForm((p) => ({ ...p, prioridad: e.target.value }))}>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="btn btn--primary" onClick={add}>Agregar</button>
            <button className="btn btn--ghost"   onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* ── Lista ── */}
      {filtered.map((t) => {
        const d    = getDiasRestantes(t.fechaEntrega);
        const urg  = !t.completada && d <= 3;
        return (
          <div key={t.id} className={`tarea-item${urg ? " tarea-item--urgent" : ""}${t.completada ? " tarea-item--done" : ""}`}>
            <button
              className={`tarea-item__check ${t.completada ? "tarea-item__check--done" : "tarea-item__check--pending"}`}
              onClick={() => toggle(t.id)}
            >
              {t.completada ? "✓" : ""}
            </button>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={`tarea-item__title${t.completada ? " tarea-item__title--done" : ""}`}>
                {t.titulo}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <MateriaBadge materia={t.materia} small />
                <PrioridadBadge prioridad={t.prioridad} />
              </div>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontSize: 14, fontWeight: 900,
                color: t.completada ? "var(--color-success)"
                  : d <= 0 ? "var(--color-danger)"
                  : d <= 3 ? "var(--color-danger)"
                  : d <= 7 ? "var(--color-warning)"
                  : "var(--color-muted)",
              }}>
                {t.completada ? "✓" : d <= 0 ? "¡Venció!" : d === 1 ? "Mañana" : `${d}d`}
              </div>
              <div style={{ fontSize: 10, color: "var(--color-dim)" }}>
                {parseFecha(t.fechaEntrega).toLocaleDateString("es-AR")}
              </div>
            </div>

            <button className="btn--icon-delete" onClick={() => del(t.id)}>×</button>
          </div>
        );
      })}
    </div>
  );
}
