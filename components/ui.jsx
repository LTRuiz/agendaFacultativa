"use client";
import { MATERIAS_COLORS } from "@/lib/data";

/* ─── MateriaBadge ────────────────────────────────────────────────────────── */
export function MateriaBadge({ materia, small = false }) {
  const color = MATERIAS_COLORS[materia] || "#64748b";
  return (
    <span
      className={`badge ${small ? "badge--sm" : "badge--md"}`}
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}55`,
      }}
    >
      <span className="badge__dot" style={{ background: color }} />
      {materia}
    </span>
  );
}

/* ─── PrioridadBadge ──────────────────────────────────────────────────────── */
export function PrioridadBadge({ prioridad }) {
  const labels = { alta: "Alta", media: "Media", baja: "Baja" };
  return (
    <span className={`badge badge--sm badge--${prioridad}`}>
      {labels[prioridad] ?? prioridad}
    </span>
  );
}

/* ─── ProgressBar ─────────────────────────────────────────────────────────── */
export function ProgressBar({ value, max, color = "#f59e0b", height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="progress-track" style={{ height }}>
      <div
        className="progress-fill"
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          boxShadow: `0 0 8px ${color}66`,
        }}
      />
    </div>
  );
}

/* ─── StatCard ────────────────────────────────────────────────────────────── */
export function StatCard({ value, label, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card__value" style={{ color }}>{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}
