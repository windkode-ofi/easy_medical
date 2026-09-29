import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Medical Equipos Médicos",
  description: "Equipamiento médico, instrumental y soluciones profesionales para fisioterapia, kinesiología, instrumental médico y equipamiento para quirófano. Productos alemanes de importación.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
