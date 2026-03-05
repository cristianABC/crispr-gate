"use client";

import Formulario from "@/app/bioseguridad/components/Formulario";
import BioseguridadSpeech from "../components/BioseguridadSpeech";
export default function CrearReportePage() {
  return (
    <div className="p-10">
      <div className="font-mono text-emerald-500 text-5xl">
        Registro de Síntomas
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-5">
        <div className="mt-10 max-w-xl col-span-7">
          <Formulario />
        </div>
        <div className="col-span-5">
          <BioseguridadSpeech />
        </div >
      </div>
    </div>
  );
}
