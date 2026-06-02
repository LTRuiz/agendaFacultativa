"use client";
import { MATERIAS_COLORS } from "@/lib/data";
import { getDiasRestantes, getTodayName, getHorasDia, getTotalEstudio } from "@/lib/utils";
import { MateriaBadge, ProgressBar } from "@/components/ui";

export default function ViewHoy({ clases, parciales, tareas, estudio }) {
  const today      = getTodayName();
  const diasValidos = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const displayDay = diasValidos.includes(today) ? today : "Lunes";

  const clasesHoy      = clases.filter((c) => c.dia === displayDay);
  const horasHoy       = getHorasDia(estudio, displayDay);
  const totalHs        = getTotalEstudio(estudio);
  const parcialesCerca = parciales
    .filter((p) => { const d = getDiasRestantes(p.fecha); return d >= 0 && d <= 14 && p.estado !== "aprobado"; })
    .sort((a, b) => getDiasRestantes(a.fecha) - getDiasRestantes(b.fecha));
  const tareasUrg = tareas
    .filter((t) => !t.completada && getDiasRestantes(t.fechaEntrega) <= 7)
    .sort((a, b) => getDiasRestantes(a.fechaEntrega) - getDiasRestantes(b.fechaEntrega));

  const dateStr = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex-col">
      {/* ── Hero ── */}
      <div className="card card--elevated" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "#f59e0b09", pointerEvents: "none" }} />
        <div>
          <div style={{ fontSize: 12, color: "var(--color-muted)", textTransform: "capitalize", marginBottom: 4 }}>{dateStr}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#f8fafc", lineHeight: 1.1 }}>{displayDay}</div>
          {!diasValidos.includes(today) && (
            <div style={{ fontSize: 11, color: "var(--color-accent)", marginTop: 6 }}>⚠ Domingo — mostrando Lunes como referencia</div>
          )}
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#4ade80", lineHeight: 1 }}>{horasHoy}h</div>
            <div style={{ fontSize: 10, color: "var(--color-muted)" }}>hoy</div>
          </div>
          <div style={{ width: 1, background: "var(--color-elevated)", alignSelf: "stretch" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: "var(--color-accent)", lineHeight: 1 }}>{totalHs}h</div>
            <div style={{ fontSize: 10, color: "var(--color-muted)" }}>esta semana</div>
          </div>
        </div>
      </div>

      {/* ── Clases + Parciales ── */}
      <div className="grid-2">
        {/* Clases hoy */}
        <div className="card">
          <div className="card__section-label">Clases de hoy</div>
          {clasesHoy.length === 0 && (
            <div style={{ color: "var(--color-border-md)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>Sin clases</div>
          )}
          {clasesHoy.map((c) => (
            <div key={c.id} className="clase-item">
              <div className="clase-item__bar" style={{ background: MATERIAS_COLORS[c.materia] || "var(--color-muted)" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="clase-item__name">{c.materia}</div>
                <div className="clase-item__meta">{c.inicio}–{c.fin} · Aula {c.aula} · Com. {c.comision}</div>
              </div>
              <div style={{ fontSize: 11, color: MATERIAS_COLORS[c.materia], fontWeight: 700, flexShrink: 0 }}>
                {c.cargaHs.toFixed(1)}h
              </div>
            </div>
          ))}
        </div>

        {/* Parciales próximos */}
        <div className="card">
          <div className="card__section-label">⚡ Próximos parciales</div>
          {parcialesCerca.length === 0 && (
            <div style={{ color: "var(--color-border-md)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>Sin parciales en 14 días</div>
          )}
          {parcialesCerca.map((p) => {
            const d = getDiasRestantes(p.fecha);
            const urgent = d <= 5;
            return (
              <div key={p.id} style={{
                display: "flex", gap: 12, marginBottom: 10,
                background: urgent ? "#7f1d1d22" : "var(--color-elevated)",
                borderRadius: "var(--radius-md)", padding: "10px 14px",
                border: urgent ? "1px solid #ef444433" : "1px solid transparent",
              }}>
                <div style={{
                  minWidth: 38, height: 38, borderRadius: "var(--radius-md)",
                  background: urgent ? "#ef444422" : "var(--color-border-md)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: urgent ? "#ef4444" : "var(--color-accent)", lineHeight: 1 }}>{d}</span>
                  <span style={{ fontSize: 8, color: "var(--color-muted)" }}>días</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.materia}</div>
                  <div style={{ fontSize: 10, color: "var(--color-muted)" }}>{p.tipo} · {new Date(p.fecha).toLocaleDateString("es-AR")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tareas urgentes ── */}
      {tareasUrg.length > 0 && (
        <div className="card card--danger">
          <div className="card__section-label" style={{ color: "var(--color-danger)" }}>🚨 Tareas que vencen esta semana</div>
          <div className="grid-2">
            {tareasUrg.map((t) => {
              const d = getDiasRestantes(t.fechaEntrega);
              return (
                <div key={t.id} style={{
                  background: "var(--color-elevated)", borderRadius: "var(--radius-md)", padding: "12px 14px",
                  borderLeft: `3px solid ${MATERIAS_COLORS[t.materia] || "var(--color-muted)"}`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text)", marginBottom: 5 }}>{t.titulo}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <MateriaBadge materia={t.materia} small />
                    <span style={{ fontSize: 11, fontWeight: 700, color: d <= 2 ? "var(--color-danger)" : "var(--color-accent)" }}>
                      {d === 0 ? "¡HOY!" : d === 1 ? "Mañana" : `${d}d`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
