import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/components.css";

export const metadata = {
  title: "UniAgenda — UTN 2K9 · 2026",
  description: "Agenda universitaria: clases, parciales, tareas y seguimiento de 35h semanales de estudio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
