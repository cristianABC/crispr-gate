"use client";

import { AlertTriangle, HelpCircle, Rocket } from "lucide-react";
import { RutaViajero } from "@/types/types.interface";

interface CrearVistaProps {
  registros: RutaViajero[];
}

export default function CrearVista({ registros }: CrearVistaProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-300 mb-4">
        Registros de Navegación ({registros.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {registros.map((r) => {
          const isLongTrip = r.distanceLightYears > 5;
          const isUnknownPlanet = r.originPlanet === "Desconocido";
          const isCritical = r.riskLevel === "CRITICAL";

          return (
            <div
              key={r.id}
              className={`rounded-lg border p-4 transition-colors ${
                isLongTrip
                  ? "bg-slate-900 border-cyan-800 hover:border-cyan-500"
                  : "bg-transparent border-cyan-700/40 hover:border-cyan-400"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-slate-400">#{r.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    r.riskLevel === "LOW"
                      ? "bg-green-500/20 text-green-400"
                      : r.riskLevel === "MEDIUM"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : r.riskLevel === "HIGH"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {r.riskLevel}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                {r.travelerName}
              </h3>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500 text-xs uppercase">Planeta Origen</span>
                  <div>
                    {isUnknownPlanet ? (
                      <span className="text-yellow-300 font-bold flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        {r.originPlanet} ?
                      </span>
                    ) : (
                      <span className="text-slate-300">{r.originPlanet}</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-xs uppercase">Coordenadas</span>
                  <div className="font-mono text-xs text-slate-400">
                    {r.coordinates.lat}, {r.coordinates.lng}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-xs uppercase">Nave</span>
                  <div>
                    {isCritical ? (
                      <span className="text-red-500 font-bold flex items-center gap-1 flex-wrap">
                        <AlertTriangle className="w-4 h-4" />
                        {r.shipModel}
                        <span className="text-xs bg-red-500/20 border border-red-500 rounded px-1.5 py-0.5">
                          INSPECCIÓN REQUERIDA
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-300">{r.shipModel}</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-xs uppercase">Distancia</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">{r.distanceLightYears} ly</span>
                    {isLongTrip && (
                      <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5">
                        <Rocket className="w-3 h-3" />
                        VIAJE LARGO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
