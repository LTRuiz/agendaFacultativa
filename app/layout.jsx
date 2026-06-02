import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import { icons } from "lucide-react";

export const metadata = {
  title: "Agenda Semanal — UTN · LRZ",
  description: "Agenda universitaria: clases, parciales, tareas y seguimiento de 35h semanales de estudio.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
