"use client";
import { DAYS, MATERIAS_COLORS } from "@/lib/data";
import { MateriaBadge, StatCard } from "@/components/ui";

export default function ViewMisClases({ clases }) {
  const totalHs = clases.reduce((a, c) => a + c.cargaHs, 0);

  const porMateria = clases.reduce((acc, c) => {
    if (!acc[c.materia]) acc[c.materia] = { clases: [], totalHs: 0 };
    acc[c.materia].clases.push(c);
    acc[c.materia].totalHs += c.cargaHs;
    return acc;
  }, {});

  return (
    <div className="flex-col">
      {/* ── Stats ── */}
      <div className="grid-3">
        <StatCard value={totalHs.toFixed(1) + "h"} label="Hs de clase / sem"  color="var(--color-accent)"  />
        <StatCard value={Object.keys(porMateria).length} label="Materias"      color="#93c5fd"              />
        <StatCard value={clases.length}                  label="Clases / sem"  color="#4ade80"              />
      </div>

      {/* ── Horario por días ── */}
      <div className="grid-2">
        {DAYS.map((dia) => {
          const c = clases.filter((x) => x.dia === dia);
          if (!c.length) return null;
          return (
            <div key={dia} className="card">
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-text)", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {dia}
                <span style={{ fontSize: 11, color: "var(--color-muted)", fontWeight: 400 }}>
                  {c.reduce((a, x) => a + x.cargaHs, 0).toFixed(1)}h
                </span>
              </div>
              {c.map((cl) => (
                <div key={cl.id} className="clase-item" style={{ borderLeft: `3px solid ${MATERIAS_COLORS[cl.materia] || "var(--color-muted)"}`, borderRadius: "var(--radius-md)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="clase-item__name">{cl.materia}</div>
                    <div className="clase-item__meta" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{cl.inicio} – {cl.fin}</span>
                      <span>Aula {cl.aula} · {cl.comision}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* ── Resumen por materia ── */}
      <div className="card">
        <div className="card__section-label">Resumen por materia</div>
        {Object.entries(porMateria).map(([mat, info]) => (
          <div key={mat} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <MateriaBadge materia={mat} />
              <span style={{ fontSize: 12, fontWeight: 700, color: MATERIAS_COLORS[mat] }}>
                {info.totalHs.toFixed(1)}h/sem · {info.clases.length} clase{info.clases.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 8 }}>
              {info.clases.map((c) => (
                <span key={c.id} style={{ fontSize: 10, background: "var(--color-elevated)", color: "var(--color-text-soft)", padding: "2px 8px", borderRadius: 4 }}>
                  {c.dia} {c.inicio}–{c.fin}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
