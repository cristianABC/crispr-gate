"use client";

import Formulario from "@/app/bioseguridad/components/Formulario";

export default function CrearReportePage() {
  return (
    <div className="p-10">
      <div className="font-mono text-emerald-500 text-5xl">
        Registro de Síntomas
      </div>
      <div className="mt-10 max-w-xl">
        <Formulario />
      </div>
    </div>
  );
}
