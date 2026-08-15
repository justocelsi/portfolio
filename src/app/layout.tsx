import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { perfil } from "@/content/perfil";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${perfil.nombre} — ${perfil.rol}`,
  description: perfil.bajada,
  openGraph: {
    title: `${perfil.nombre} — ${perfil.rol}`,
    description: perfil.bajada,
    locale: "es_AR",
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
