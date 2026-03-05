"use client";

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

      <div className="overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-800 text-cyan-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Viajero</th>
              <th className="px-4 py-3">Planeta Origen</th>
              <th className="px-4 py-3">Coordenadas</th>
              <th className="px-4 py-3">Nave</th>
              <th className="px-4 py-3">Riesgo</th>
              <th className="px-4 py-3">Distancia (ly)</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => {
              const isLongTrip = r.distanceLightYears > 5;
              const isUnknownPlanet = r.originPlanet === "Desconocido";
              const isCritical = r.riskLevel === "CRITICAL";

              return (
                <tr
                  key={r.id}
                  className={`border-b border-slate-700 transition-colors hover:bg-slate-800/50 ${
                    isLongTrip ? "bg-slate-900" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-slate-400">
                    {r.id}
                  </td>
                  <td className="px-4 py-3">{r.travelerName}</td>
                  <td className="px-4 py-3">
                    {isUnknownPlanet ? (
                      <span className="text-yellow-300 font-bold">
                        {r.originPlanet} ?
                      </span>
                    ) : (
                      r.originPlanet
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {r.coordinates.lat}, {r.coordinates.lng}
                  </td>
                  <td className="px-4 py-3">
                    {isCritical ? (
                      <span className="text-red-500 font-bold">
                        {r.shipModel}{" "}
                        <span className="text-xs bg-red-500/20 border border-red-500 rounded px-1.5 py-0.5">
                          INSPECCIÓN REQUERIDA
                        </span>
                      </span>
                    ) : (
                      r.shipModel
                    )}
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3">
                    <span>
                      {r.distanceLightYears}
                      {isLongTrip && (
                        <span className="ml-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5">
                          VIAJE LARGO
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
