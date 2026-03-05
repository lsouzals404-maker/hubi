import "@/styles/variables.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plataforma Central",
  description: "Sistema multi-comércio com agendamento inteligente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}