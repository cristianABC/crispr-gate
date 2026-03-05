"use client";

import { useState, useEffect } from "react";
import { archivosBiometricos } from "@/mocks/mocks";
import { PerfilBiometrico } from "@/types/types.interface";
import FormularioBiometrica from "./formularioBiometria";
import CardBiometria from "./cardBiometria";
import { Button } from "@/components/ui/button";

export default function BiometriaPage() {
  const [registros, setRegistros] = useState<PerfilBiometrico[]>(archivosBiometricos);
  const [ultimoEscaneo, setUltimoEscaneo] = useState<string | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem("ultimo_escaneo");
    if (guardado) setUltimoEscaneo(guardado);
  }, []);

  const handleCardClick = (nombre: string) => {
    localStorage.setItem("ultimo_escaneo", nombre);
    setUltimoEscaneo(nombre);
  };

  const handleLimpiarCache = () => {
    localStorage.removeItem("ultimo_escaneo");
    setUltimoEscaneo(null);
  };

  const handleNuevoRegistro = (registro: PerfilBiometrico) => {
    setRegistros((prev) => [registro, ...prev]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold font-mono text-cyan-400">ARCHIVO BIOMÉTRICO</h1>

      {/* LocalStorage Banner */}
      <div className="flex items-center justify-between bg-gray-900 border border-cyan-500 rounded p-4">
        <span className="text-cyan-400 font-mono text-sm">
          💾 Último sujeto escaneado:{" "}
          <span className="text-white font-bold">{ultimoEscaneo ?? "—"}</span>
        </span>
        <Button variant="destructive" size="sm" onClick={handleLimpiarCache}>
          🧹 Limpiar Caché
        </Button>
      </div>

      <FormularioBiometrica onNuevoRegistro={handleNuevoRegistro} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {registros.map((perfil) => (
          <CardBiometria key={perfil.id} perfil={perfil} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
