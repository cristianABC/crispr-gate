"use client";

import { useEffect, useState } from "react";
import { ViajeroRegistro } from "@/types/types.interface";
import { Card } from "@/components/ui/card";

export default function RegistroNeonPage() {
  const [registros, setRegistros] = useState<ViajeroRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/registro-neon");
        if (!response.ok) {
          throw new Error("Error al obtener registros");
        }
        const data = await response.json();
        setRegistros(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("Error fetching registros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Cargando registros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🛰️ Registro Neón - Protocolo de Acceso
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Terminal de entrada para los viajeros del Nexo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {registros.map((registro) => (
          <Card
            key={registro.id}
            className={`p-4 border-2 transition-all ${
              registro.riskLevel === "CRITICAL"
                ? "bg-red-200 border-red-500"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {/* Encabezado con ID */}
            <div className="mb-3 pb-2 border-b border-gray-300">
              <span className="text-sm font-mono text-gray-600">
                {registro.id}
              </span>
            </div>

            {/* Nombre - Con color condicional si es HIGH */}
            <h2
              className={`text-xl font-bold mb-3 ${
                registro.riskLevel === "HIGH"
                  ? "text-red-600"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {registro.name}
            </h2>

            {/* Información del registro */}
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Origen:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {registro.origin}
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Hora de Llegada:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {registro.arrivalTime}
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Código de Acceso:
                </span>
                <p className="font-mono text-gray-600 dark:text-gray-400">
                  {registro.accessCode}
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Nivel de Riesgo:
                </span>
                <p
                  className={`font-bold uppercase ${
                    registro.riskLevel === "CRITICAL"
                      ? "text-red-700"
                      : registro.riskLevel === "HIGH"
                      ? "text-red-600"
                      : registro.riskLevel === "MEDIUM"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {registro.riskLevel}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
