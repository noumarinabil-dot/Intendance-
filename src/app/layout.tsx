import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SGX-Intendance - Gestion de Maintenance",
  description: "Système de gestion de la maintenance des sites et équipements",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold">
                🏢 SGX-Intendance
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                  Tableau de bord
                </Link>
                <Link href="/planning" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                  Planning
                </Link>
                <Link href="/interventions" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                  Interventions
                </Link>
                <Link href="/equipements" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                  Équipements
                </Link>
                <Link href="/sites" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                  Sites
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
