"use client";
import { useState } from "react";
import { MATERIAS_COLORS } from "@/lib/data";
import { getDiasRestantes, parseFecha } from "@/lib/utils";
import { MateriaBadge } from "@/components/ui";

const ESTADO_CONFIG = {
  pendiente:  { bg: "var(--color-elevated)", c: "var(--color-text-soft)", l: "Pendiente"     },
  preparando: { bg: "rgba(245,158,11,.13)",  c: "#f59e0b",                l: "Preparando 📖" },
  aprobado:   { bg: "rgba(34,197,94,.13)",   c: "#22c55e",                l: "Aprobado ✓"    },
};

export default function ViewParciales({ parciales, setParciales }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    materia: Object.keys(MATERIAS_COLORS)[0],
    fecha: "", tipo: "1er Parcial", temario: "",
  });

  function cycleEstado(id) {
    setParciales((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = { pendiente: "preparando", preparando: "aprobado", aprobado: "pendiente" };
        return { ...p, estado: next[p.estado] };
      })
    );
  }

  function addParcial() {
    if (!form.fecha) return;
    setParciales((prev) => [...prev, { ...form, id: Date.now(), estado: "pendiente" }]);
    setForm({ materia: Object.keys(MATERIAS_COLORS)[0], fecha: "", tipo: "1er Parcial", temario: "" });
    setShowForm(false);
  }

  function delParcial(id) {
    setParciales((prev) => prev.filter((p) => p.id !== id));
  }

  const sorted = [...parciales].sort((a, b) => getDiasRestantes(a.fecha) - getDiasRestantes(b.fecha));

  return (
    <div className="flex-col">
      {/* ── Contadores ── */}
      <div className="grid-3">
        {["pendiente", "preparando", "aprobado"].map((est) => {
          const cnt = parciales.filter((p) => p.estado === est).length;
          const s   = ESTADO_CONFIG[est];
          return (
            <div key={est} style={{ background: s.bg, border: `1px solid ${s.c}33`, borderRadius: "var(--radius-lg)", padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.c }}>{cnt}</div>
              <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* ── Botón agregar ── */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn--primary" onClick={() => setShowForm(!showForm)}>+ Agregar parcial</button>
      </div>

      {/* ── Formulario ── */}
      {showForm && (
        <div className="form-panel">
          <div className="form-grid">
            <select className="form-input" value={form.materia} onChange={(e) => setForm((p) => ({ ...p, materia: e.target.value }))}>
              {Object.keys(MATERIAS_COLORS).map((m) => <option key={m}>{m}</option>)}
            </select>
            <input className="form-input" type="date" value={form.fecha} onChange={(e) => setForm((p) => ({ ...p, fecha: e.target.value }))} />
            <input className="form-input" placeholder="Tipo (ej: 1er Parcial)" value={form.tipo} onChange={(e) => setForm((p) => ({ ...p, tipo: e.target.value }))} />
            <input className="form-input" placeholder="Temario" value={form.temario} onChange={(e) => setForm((p) => ({ ...p, temario: e.target.value }))} />
          </div>
          <div className="form-actions">
            <button className="btn btn--primary" onClick={addParcial}>Agregar</button>
            <button className="btn btn--ghost" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* ── Lista ── */}
      {sorted.map((p) => {
        const d    = getDiasRestantes(p.fecha);
        const s    = ESTADO_CONFIG[p.estado];
        const urg  = d <= 5 && p.estado !== "aprobado";
        return (
          <div key={p.id} className={`parcial-card${urg ? " parcial-card--urgent" : ""}`}>
            {urg && <div className="parcial-card__urgency-bar" />}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <MateriaBadge materia={p.materia} />
                  <span style={{ fontSize: 11, background: "var(--color-elevated)", color: "var(--color-text-soft)", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{p.tipo}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--color-muted)", marginBottom: 3 }}>
                  📅 {parseFecha(p.fecha).toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "long" })}
                </div>
                {p.temario && <div style={{ fontSize: 11, color: "var(--color-dim)" }}>📚 {p.temario}</div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                {p.estado !== "aprobado" && (
                  <div
                    className="parcial-card__countdown"
                    style={{
                      background: d <= 3 ? "#ef444422" : d <= 7 ? "#f59e0b22" : "var(--color-elevated)",
                      border: `1px solid ${d <= 3 ? "#ef444466" : d <= 7 ? "#f59e0b66" : "var(--color-border-md)"}`,
                    }}
                  >
                    <div className="parcial-card__countdown-num" style={{ color: d <= 3 ? "#ef4444" : d <= 7 ? "#f59e0b" : "var(--color-text-soft)" }}>
                      {d < 0 ? "✗" : d}
                    </div>
                    <div className="parcial-card__countdown-label">{d < 0 ? "vencido" : "días"}</div>
                  </div>
                )}
                <button
                  onClick={() => cycleEstado(p.id)}
                  style={{ background: s.bg, color: s.c, border: `1px solid ${s.c}44`, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {s.l}
                </button>
                <button className="btn--icon-delete" onClick={() => delParcial(p.id)}>×</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
