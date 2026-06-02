"use client";
import { useState, useEffect } from "react";
import { initialClases, initialParciales, initialTareas, initialEstudio, MATERIAS_COLORS, META_HORAS_SEMANALES } from "@/lib/data";
import { getTotalEstudio, getDiasRestantes } from "@/lib/utils";

import { Sun, Calendar, FileText, BarChart2, CheckSquare, CalendarDays, GraduationCap, Zap } from 'lucide-react';

import ViewHoy from "@/components/ViewHoy";
import ViewSemana from "@/components/ViewSemana";
import ViewParciales from "@/components/ViewParciales";
import ViewMisClases from "@/components/ViewMisClases";
import ViewProgreso from "@/components/ViewProgreso";
import ViewTareas from "@/components/ViewTareas";
import { ProgressBar } from "@/components/ui";

// ─── Iconos ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  hoy: Sun,
  semana: Calendar,
  parciales: FileText,
  clases: CalendarDays,
  progreso: BarChart2,
  tareas: CheckSquare,
};

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "hoy", label: "Hoy", iconId: "hoy" },
  { id: "semana", label: "Semana", iconId: "semana" },
  { id: "parciales", label: "Parciales", iconId: "parciales" },
  { id: "clases", label: "Mis Clases", iconId: "clases" },
  { id: "progreso", label: "Progreso", iconId: "progreso" },
  { id: "tareas", label: "Tareas", iconId: "tareas" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
  const [tab, setTab] = useState("hoy");
  const [parciales, setParciales] = useState(() => {
    if (typeof window === "undefined") return initialParciales;
    const saved = localStorage.getItem("ua_parciales");
    return saved ? JSON.parse(saved) : initialParciales;
  });
  const [tareas, setTareas] = useState(() => {
    if (typeof window === "undefined") return initialTareas;
    const saved = localStorage.getItem("ua_tareas");
    return saved ? JSON.parse(saved) : initialTareas;
  });
  const [estudio, setEstudio] = useState(() => {
    if (typeof window === "undefined") return initialEstudio;
    const saved = localStorage.getItem("ua_estudio");
    return saved ? JSON.parse(saved) : initialEstudio;
  });

  useEffect(() => { localStorage.setItem("ua_parciales", JSON.stringify(parciales)); }, [parciales]);
  useEffect(() => { localStorage.setItem("ua_tareas",    JSON.stringify(tareas));    }, [tareas]);
  useEffect(() => { localStorage.setItem("ua_estudio",   JSON.stringify(estudio));   }, [estudio]);

  const total = getTotalEstudio(estudio);
  const pendientes = tareas.filter((t) => !t.completada).length;
  const parcCerca = parciales.filter((p) => getDiasRestantes(p.fecha) <= 7 && p.estado !== "aprobado").length;
  const pct = Math.min(100, (total / META_HORAS_SEMANALES) * 100);
  const metaColor = pct >= 100 ? "var(--color-success)" : pct >= 60 ? "var(--color-warning)" : "var(--color-danger)";

  const currentNav = NAV.find((n) => n.id === tab);
  
  const HeaderIcon = currentNav ? ICON_MAP[currentNav.iconId] : null;

  return (
    <>
      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <header className="topbar">
        <div className="topbar__brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="topbar__logo" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={24} strokeWidth={2} className="text-slate-700" />
          </div>
          <div>
            <div className="topbar__title">Agenda Facultad</div>
            <div className="topbar__sub">UTN · FRC · 2026</div>
          </div>
        </div>

        <div className="topbar__badges" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {parcCerca > 0 && (
            <span className="pill pill--danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} strokeWidth={2} />
              <span>
                {parcCerca} parcial{parcCerca > 1 ? "es" : ""} próximo{parcCerca > 1 ? "s" : ""}
              </span>
            </span>
          )}
          
          <span
            className="pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: metaColor + "22",
              color: metaColor,
              border: `1px solid ${metaColor}44`,
            }}
          >
            {total}h / {META_HORAS_SEMANALES}h · {Math.round(pct)}%
          </span>
        </div>
      </header>

      {/* ── App shell ──────────────────────────────────────────────────────── */}
      <div className="app-shell">
        {/* Sidebar */}
        <nav className="sidebar">
          {NAV.map((item) => {
            const active = tab === item.id;
            let badge    = null;
            if (item.id === "tareas"    && pendientes > 0) badge = pendientes;
            if (item.id === "parciales" && parcCerca  > 0) badge = parcCerca;

            const IconComponent = ICON_MAP[item.iconId];

            return (
              <button
                key={item.id}
                className={`sidebar__nav-btn${active ? " active" : ""}`}
                onClick={() => setTab(item.id)}
              >
                <span className="sidebar__nav-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {IconComponent && <IconComponent size={18} strokeWidth={1.8} />}
                </span>
                <span className="sidebar__nav-label">{item.label}</span>
                {badge && <span className="pill--counter">{badge}</span>}
              </button>
            );
          })}

          {/* Mini progreso */}
          <div className="sidebar__mini-card">
            <div className="sidebar__mini-title">Meta semanal</div>
            <div className="sidebar__mini-value" style={{ color: metaColor }}>
              {total}h <span style={{ fontSize: 11, color: "var(--color-muted)", fontWeight: 400 }}>/ {META_HORAS_SEMANALES}</span>
            </div>
            <ProgressBar value={total} max={META_HORAS_SEMANALES} color={metaColor} height={5} />
            <div className="sidebar__mini-sub">
              {META_HORAS_SEMANALES - total > 0
                ? `${(META_HORAS_SEMANALES - total).toFixed(1)}h restantes`
                : "✓ Cumplida"}
            </div>
          </div>

          {/* Leyenda materias */}
          <div className="sidebar__mini-card" style={{ marginTop: 14 }}>
            <div className="sidebar__mini-title">Materias</div>
            {Object.entries(MATERIAS_COLORS).map(([m, c]) => (
              <div key={m} className="sidebar__legend-item">
                <div className="sidebar__legend-dot" style={{ background: c }} />
                <span className="sidebar__legend-label">{m}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Main */}
        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {HeaderIcon && <HeaderIcon size={24} strokeWidth={2} style={{ display: 'inline-block' }} />}
              <span>{currentNav?.label}</span>
            </h1>
          </div>

          {tab === "hoy"       && <ViewHoy       clases={initialClases} parciales={parciales} tareas={tareas} estudio={estudio} />}
          {tab === "semana"    && <ViewSemana    clases={initialClases} estudio={estudio} setEstudio={setEstudio} />}
          {tab === "parciales" && <ViewParciales parciales={parciales} setParciales={setParciales} />}
          {tab === "clases"    && <ViewMisClases clases={initialClases} />}
          {tab === "progreso"  && <ViewProgreso  estudio={estudio} />}
          {tab === "tareas"    && <ViewTareas    tareas={tareas} setTareas={setTareas} />}
        </main>
      </div>
    </>
  );
}