"use client";
import { DAYS, SHORT_DAYS, META_HORAS_SEMANALES, MATERIAS_COLORS } from "@/lib/data";
import { getTotalEstudio, getHorasPorMateria, getHorasDia } from "@/lib/utils";
import { ProgressBar } from "@/components/ui";

export default function ViewProgreso({ estudio }) {
  const hpm   = getHorasPorMateria(estudio);
  const total = getTotalEstudio(estudio);
  const maxH  = Math.max(...Object.values(hpm), 1);
  const pct   = Math.min(100, (total / META_HORAS_SEMANALES) * 100);
  const accentColor = pct >= 100 ? "var(--color-success)" : "var(--color-accent)";

  return (
    <div className="flex-col">
      {/* ── Resumen global ── */}
      <div className="card card--elevated" style={{ padding: "22px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Progreso semanal · meta {META_HORAS_SEMANALES}h
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#f8fafc", marginTop: 4 }}>
              {total}h{" "}
              <span style={{ fontSize: 16, color: "var(--color-muted)", fontWeight: 400 }}>/ {META_HORAS_SEMANALES}h</span>
            </div>
          </div>
          {/* Círculo de progreso */}
          <div
            className="circle-progress"
            style={{ background: `conic-gradient(${accentColor} ${pct * 3.6}deg, var(--color-elevated) 0deg)` }}
          >
            <div className="circle-progress__inner" style={{ color: accentColor }}>
              {Math.round(pct)}%
            </div>
          </div>
        </div>
        <ProgressBar value={total} max={META_HORAS_SEMANALES} color={accentColor} height={8} />
        <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 8 }}>
          {META_HORAS_SEMANALES - total > 0
            ? `Faltan ${(META_HORAS_SEMANALES - total).toFixed(1)}h`
            : "✓ Meta cumplida esta semana 🎉"}
        </div>
      </div>

      {/* ── Barras por materia ── */}
      <div className="card">
        <div className="card__section-label">Horas de estudio por materia</div>
        {Object.entries(hpm)
          .sort((a, b) => b[1] - a[1])
          .map(([mat, hs]) => (
            <div key={mat} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "var(--color-text)" }}>{mat}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: MATERIAS_COLORS[mat] }}>{hs}h</span>
              </div>
              <ProgressBar value={hs} max={Math.max(maxH, 8)} color={MATERIAS_COLORS[mat]} height={7} />
            </div>
          ))}
      </div>

      {/* ── Mapa de calor ── */}
      <div className="card">
        <div className="card__section-label">Intensidad diaria de estudio</div>
        <div className="heatmap">
          {DAYS.map((dia, i) => {
            const hs     = getHorasDia(estudio, dia);
            const meta   = META_HORAS_SEMANALES / 6;
            const col    = hs >= meta ? "#22c55e" : hs >= meta * 0.5 ? "#f59e0b" : "var(--color-border-md)";
            const barH   = Math.max(20, Math.min(80, (hs / meta) * 80));
            return (
              <div key={dia} className="heatmap__col">
                <span className="heatmap__value" style={{ color: col }}>{hs > 0 ? `${hs}h` : ""}</span>
                <div
                  className="heatmap__bar"
                  style={{
                    height: barH,
                    background: hs === 0 ? col + "33" : col + "aa",
                    boxShadow: hs > 0 ? `0 0 10px ${col}44` : "none",
                  }}
                />
                <span className="heatmap__day">{SHORT_DAYS[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
