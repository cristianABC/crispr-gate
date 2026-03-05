"use client";

import { FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ViajeroRegistro } from "@/types/types.interface";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RegistroNeonPage() {
  // Estados para el formulario de creación
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Estados para la visualización
  const [registros, setRegistros] = useState<ViajeroRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isNameValid = name.trim().length > 0;
  const showNameError = touched && !isNameValid;

  // Cargar registros iniciales
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setShowSuccessBanner(false);

    if (!isNameValid) return;

    setIsSubmitting(true);
    await wait(1500);

    setName("");
    setOrigin("");
    setTouched(false);
    setIsSubmitting(false);
    setShowSuccessBanner(true);

    toast.success("PROTOCOLO COMPLETADO", {
      className: "border-green-700 bg-green-100 text-green-800",
    });
  };

  return (
    <div className="space-y-8">
      {/* Sección de Formulario de Creación */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Registro de Sujetos
        </h2>
        <div className="mx-auto max-w-2xl">
          <Card className="border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
            <CardHeader>
              <CardTitle className="text-cyan-600">Registrar nuevo viajero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {showSuccessBanner && (
                <p className="rounded-md border border-green-700 bg-green-100 px-3 py-2 text-sm font-semibold text-green-800">
                  PROTOCOLO COMPLETADO
                </p>
              )}

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="Nombre del viajero"
                    aria-invalid={showNameError}
                  />
                  {showNameError && <p className="text-sm text-red-600">El nombre es obligatorio.</p>}
                </div>

                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Origen (opcional)"
                />

                <Button type="submit" disabled={!isNameValid || isSubmitting}>
                  {isSubmitting ? "Procesando..." : "Registrar sujeto"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sección de Visualización */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🛰️ Registros - Protocolo de Acceso
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Terminal de entrada para los viajeros del Nexo
        </p>

        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-gray-600">Cargando registros...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
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
                <h3
                  className={`text-xl font-bold mb-3 ${
                    registro.riskLevel === "HIGH"
                      ? "text-red-600"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {registro.name}
                </h3>

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
        )}
      </div>
    </div>
  );
}
