# 🎓 UniAgenda

Agenda universitaria personal construida con **Next.js 15 + App Router**.  
Diseñada para hacer seguimiento de clases, parciales, tareas y cumplir la meta de **35 horas semanales de estudio** (sin contar las horas de cursada).

---

## ✨ Funcionalidades

| Vista | Descripción |
|---|---|
| ☀️ **Hoy** | Clases del día, parciales en los próximos 14 días y tareas urgentes de la semana |
| 📅 **Semana completa** | Los 6 días expandibles con progreso hacia la meta diaria. Controles `+/−` para registrar horas de estudio por materia |
| 📝 **Parciales** | Seguimiento de fechas con cuenta regresiva, estados (Pendiente → Preparando → Aprobado) y alertas visuales |
| 🏫 **Mis Clases** | Horario de cursada completo con aula, comisión y carga horaria por materia |
| 📊 **Progreso** | Círculo de progreso semanal, barras por materia y mapa de calor de intensidad diaria |
| ✅ **Tareas** | Gestión completa: agregar, completar, eliminar, filtrar por estado, prioridad y cuenta regresiva |

---

## 🗂 Estructura del proyecto

```
uniagenda/
├── app/
│   ├── layout.jsx        # Root layout — importa todos los CSS
│   └── page.jsx          # Shell principal: topbar, sidebar, routing de vistas
│
├── components/
│   ├── ui.jsx            # Primitivos reutilizables: MateriaBadge, ProgressBar, StatCard…
│   ├── ViewHoy.jsx       # Vista "Hoy"
│   ├── ViewSemana.jsx    # Vista "Semana"
│   ├── ViewParciales.jsx # Vista "Parciales"
│   ├── ViewMisClases.jsx # Vista "Mis Clases"
│   ├── ViewProgreso.jsx  # Vista "Progreso"
│   └── ViewTareas.jsx    # Vista "Tareas"
│
├── lib/
│   ├── data.js           # Datos iniciales: clases, parciales, tareas, estudio, colores
│   └── utils.js          # Funciones puras: getDiasRestantes, getTotalEstudio, etc.
│
├── styles/
│   ├── variables.css     # Design tokens (colores, radios, tipografía, spacing)
│   ├── globals.css       # Reset global + scrollbar
│   ├── layout.css        # Topbar, sidebar, main content
│   └── components.css    # Badges, cards, progress bars, botones, formularios…
│
├── jsconfig.json         # Alias @ → raíz del proyecto
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Instalación y uso

### Requisitos
- Node.js ≥ 18
- npm ≥ 9 (o pnpm / yarn)

### Pasos

```bash
# 1. Clonar / extraer la carpeta
cd uniagenda

# 2. Instalar dependencias
npm install

# 3. Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Build de producción

```bash
npm run build
npm run start
```

---

## ⚙️ Configuración personal

Todos los datos están centralizados en **`lib/data.js`**. Editá ese archivo para adaptar la agenda a tu horario:

### Cambiar el horario de clases
```js
// lib/data.js
export const initialClases = [
  {
    id: 1,
    materia: "Análisis de Sistemas de Información",
    dia: "Lunes",
    inicio: "17:20",
    fin: "19:45",
    aula: "229",
    comision: "2K9",
    cargaHs: 2.4,     // horas reales de cursada
  },
  // ...
];
```

### Cambiar la meta de horas semanales
```js
// lib/data.js
export const META_HORAS_SEMANALES = 35; // ← cambiá este número
```

### Agregar / cambiar materias y colores
```js
// lib/data.js
export const MATERIAS_COLORS = {
  "Análisis de Sistemas de Información": "#4ade80",
  "Física II":                            "#93c5fd",
  "Comunicación de Datos":                "#f0abfc",
  "Análisis Matemático II":               "#cbd5e1",
  // "Nueva Materia":                     "#fb923c",  ← agregá así
};
```

### Cambiar el semestre / año en el topbar
```jsx
// app/page.jsx  — buscá esta línea:
<div className="topbar__sub">UTN · 2K9 · 2026</div>
```

---

## 🎨 Personalización visual

Los tokens de diseño están en **`styles/variables.css`**:

```css
:root {
  --color-bg:        #020817;   /* fondo oscuro principal */
  --color-accent:    #f59e0b;   /* ámbar — color principal de marca */
  --color-success:   #22c55e;   /* verde — completado / aprobado */
  --color-warning:   #f59e0b;   /* amarillo — advertencias */
  --color-danger:    #ef4444;   /* rojo — urgente / vencido */
  /* ... */
}
```

Cambiá `--color-accent` para cambiar el color de toda la interfaz de una sola vez.

---

## 📦 Dependencias

| Paquete | Versión | Uso |
|---|---|---|
| `next` | 15.3 | Framework React con App Router |
| `react` | 19 | Librería de UI |
| `react-dom` | 19 | Renderizado DOM |

Sin librerías de UI externas — todo el diseño es CSS puro con variables.

---

## 📋 Notas

- Los datos se guardan **solo en memoria** (estado de React). Al recargar la página se resetean a los valores de `lib/data.js`.  
- Para persistencia real, podés integrar `localStorage` en `app/page.jsx` con `useEffect`, o conectar una base de datos via API routes de Next.js.
- El proyecto usa el **App Router** de Next.js 15. Los componentes que usan hooks llevan la directiva `"use client"` al inicio del archivo.

---

## 📄 Licencia

Uso personal — sin restricciones.
