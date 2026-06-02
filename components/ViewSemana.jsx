"use client";
import { useState } from "react";
import { DAYS, SHORT_DAYS, META_HORAS_SEMANALES, MATERIAS_COLORS } from "@/lib/data";
import { getTotalEstudio, getHorasDia } from "@/lib/utils";
import { ProgressBar } from "@/components/ui";

export default function ViewSemana({ clases, estudio, setEstudio }) {
  const [expanded, setExpanded] = useState(null);

  const total     = getTotalEstudio(estudio);
  const pct       = Math.min(100, (total / META_HORAS_SEMANALES) * 100);
  const metaColor = pct >= 100 ? "var(--color-success)" : pct >= 60 ? "var(--color-warning)" : "var(--color-danger)";

  function adj(dia, mat, delta) {
    setEstudio((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [mat]: Math.max(0, parseFloat(((prev[dia]?.[mat] || 0) + delta).toFixed(1))),
      },
    }));
  }

  return (
    <div className="flex-col">
      {/* ── Meta semanal ── */}
      <div className="card card--elevated" style={{ padding: "22px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Meta semanal de estudio (sin contar clases)
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", marginTop: 4 }}>
              {total}h{" "}
              <span style={{ fontSize: 16, color: "var(--color-muted)", fontWeight: 400 }}>/ {META_HORAS_SEMANALES}h</span>
            </div>
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: metaColor }}>{Math.round(pct)}%</div>
        </div>
        <ProgressBar value={total} max={META_HORAS_SEMANALES} color={metaColor} height={10} />
        <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 8 }}>
          {META_HORAS_SEMANALES - total > 0
            ? `Faltan ${(META_HORAS_SEMANALES - total).toFixed(1)}h para la meta`
            : "✓ Meta semanal cumplida 🎉"}
        </div>
      </div>

      {/* ── Días ── */}
      {DAYS.map((dia, i) => {
        const hs      = getHorasDia(estudio, dia);
        const metaDia = META_HORAS_SEMANALES / 6;
        const color   = hs >= metaDia ? "#22c55e" : hs >= metaDia * 0.5 ? "#f59e0b" : "var(--color-muted)";
        const exp     = expanded === dia;
        const clasesD = clases.filter((x) => x.dia === dia);

        return (
          <div key={dia} className={`day-row${exp ? " day-row--expanded" : ""}`}>
            <div className="day-row__header" onClick={() => setExpanded(exp ? null : dia)}>
              <div className="day-row__badge" style={{ border: `1px solid ${color}44` }}>
                <span className="day-row__badge-abbr">{SHORT_DAYS[i]}</span>
                <span className="day-row__badge-hours" style={{ color }}>{hs}h</span>
              </div>
              <div className="day-row__info">
                <div className="day-row__title-row">
                  <span className="day-row__name">{dia}</span>
                  <span className="day-row__meta">{clasesD.length} clase{clasesD.length !== 1 ? "s" : ""} · meta {metaDia.toFixed(1)}h</span>
                </div>
                <ProgressBar value={hs} max={metaDia} color={color} height={4} />
              </div>
              <span className={`day-row__chevron${exp ? " day-row__chevron--open" : ""}`}>▼</span>
            </div>

            {exp && (
              <div className="day-row__body">
                <div style={{ paddingTop: 16 }}>
                  {/* Horas por materia */}
                  <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                    Horas de estudio por materia
                  </div>
                  {Object.keys(MATERIAS_COLORS).map((mat) => {
                    const h = estudio[dia]?.[mat] || 0;
                    return (
                      <div key={mat} className="hora-row">
                        <div className="hora-row__label">{mat}</div>
                        <div style={{ flex: 1 }}>
                          <ProgressBar value={h} max={6} color={MATERIAS_COLORS[mat]} height={5} />
                        </div>
                        <div className="hora-row__controls">
                          <button className="btn btn--xs" onClick={() => adj(dia, mat, -0.5)}>−</button>
                          <span className="hora-row__value">{h}h</span>
                          <button className="btn btn--xs" onClick={() => adj(dia, mat, 0.5)}>+</button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Clases del día */}
                  {clasesD.length > 0 && (
                    <>
                      <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 10px" }}>
                        Clases del día
                      </div>
                      {clasesD.map((c) => (
                        <div key={c.id} className="clase-item">
                          <div className="clase-item__bar" style={{ background: MATERIAS_COLORS[c.materia] }} />
                          <div>
                            <div className="clase-item__name">{c.materia}</div>
                            <div className="clase-item__meta">{c.inicio}–{c.fin} · Aula {c.aula} · {c.comision}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
