"use client";

import { ReporteSalud } from "@/types/types.interface";

export default function LogRegistro({ logs }: { logs: ReporteSalud[] }) {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-xs font-mono text-emerald-500/50 uppercase tracking-widest">
        Historial de Reportes Sanitarios
      </h3>

      {logs.length === 0 && (
        <p className="text-xs text-slate-600 italic font-mono">
          Esperando transmisión de datos...
        </p>
      )}

      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="border-l-2 border-emerald-500 bg-emerald-500/5 p-3 rounded-r-lg"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-mono text-emerald-400">
                ID: {log.id} — {log.patientName}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  log.temperature >= 38
                    ? "bg-red-500 text-white"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {log.temperature}°C
              </span>
            </div>
            <p className="text-sm text-slate-300 font-mono leading-tight">
              {log.symptoms || "Sin síntomas reportados."}
            </p>
            <div className="flex gap-2 mt-1">
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  log.status === "INFECTED"
                    ? "bg-red-500/20 text-red-400"
                    : log.status === "QUARANTINE"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {log.status}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-700 text-slate-300">
                Riesgo: {log.riskLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
