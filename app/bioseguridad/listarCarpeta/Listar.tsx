"use client";

import { useEffect, useState } from "react";
import { reportesSanitarios } from "../../../mocks/mocks";

export default function RequerimientoListar() {

  const [reportes, setReportes] = useState([...reportesSanitarios]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setReportes([...reportesSanitarios]);
    }, 500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {reportes.map((reporte) => {
        return (
          <div
            key={reporte.id}
            className={`
              p-4
              ${
                reporte.status === "INFECTED"
                  ? "border-2 border-red-600 animate-pulse"
                  : "border border-gray-600"
              }
            `}
          >
            <p>ID: {reporte.id}</p>

            <h2 className="text-lg font-semibold mb-2">
              {reporte.patientName}
            </h2>

            <p
              className={`
                mt-2
                ${
                  reporte.temperature > 38
                    ? "text-red-500 font-bold"
                    : "text-black-200"
                }
              `}
            >
              Temperatura: {reporte.temperature}°C
            </p>

            {reporte.temperature > 38 && (
              <p className="text-red-600 font-bold mt-1">
                ALERTA FIEBRE
              </p>
            )}

            <p className="mt-2 text-sm">
              Síntomas: {reporte.symptoms}
            </p>

            {reporte.riskLevel === "LOW" && (
              <span className="mt-3 bg-green-600 text-white px-2 py-1 rounded">
                ESTABLE
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}