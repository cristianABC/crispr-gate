"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ReporteSalud } from "@/types/types.interface";
import { reportesSanitarios } from "@/mocks/mocks";

type FormValues = {
  patientName: string;
  temperature: number;
  symptoms: string;
  status: ReporteSalud["status"];
  riskLevel: ReporteSalud["riskLevel"];
};

export default function Formulario() {
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const contadorId = useRef(311);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      patientName: "",
      temperature: 36.5,
      symptoms: "",
      status: "STABLE",
      riskLevel: "LOW",
    },
  });

  const symptoms = watch("symptoms");

  const alEnviar = (data: FormValues) => {
    setCargando(true);

    setTimeout(() => {
      const nuevoReporte: ReporteSalud = {
        id: `BIO-${contadorId.current}`,
        patientName: data.patientName,
        temperature: data.temperature,
        symptoms: data.symptoms,
        status: data.status,
        riskLevel: data.riskLevel,
      };

      contadorId.current++;
      reportesSanitarios.push(nuevoReporte);
      console.log("Reporte registrado:", nuevoReporte);
      console.log("Total en mocks:", reportesSanitarios.length);
      setCargando(false);
      setMensajeExito(true);
      reset();

      setTimeout(() => setMensajeExito(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(alEnviar)} className="space-y-4">
      {/* NOMBRE DEL PACIENTE */}
      <div>
        <label className="text-xs font-mono text-emerald-500">
          Nombre del Paciente
        </label>
        <input
          type="text"
          {...register("patientName", { required: true })}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 focus:border-emerald-500 outline-none"
        />
      </div>

      {/* TEMPERATURA */}
      <div>
        <label className="text-xs font-mono text-emerald-500">
          Temperatura (°C)
        </label>
        <input
          type="number"
          step="0.1"
          {...register("temperature", {
            valueAsNumber: true,
            validate: (value) => value > 0 || "LECTURA TÉRMICA ERRÓNEA",
          })}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 focus:border-emerald-500 outline-none"
        />
        {errors.temperature && (
          <p className="text-xs font-mono text-red-500 mt-1">
            {errors.temperature.message}
          </p>
        )}
      </div>

      {/* SÍNTOMAS */}
      <div>
        <label className="text-xs font-mono text-emerald-500">Síntomas</label>
        <textarea
          {...register("symptoms", { required: true })}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 h-20 outline-none"
        />
      </div>

      {/* ESTADO */}
      <div>
        <label className="text-xs font-mono text-emerald-500">Estado</label>
        <select
          {...register("status")}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 outline-none"
        >
          <option value="STABLE">Estable</option>
          <option value="QUARANTINE">Cuarentena</option>
          <option value="INFECTED">Infectado</option>
        </select>
      </div>

      {/* NIVEL DE RIESGO */}
      <div>
        <label className="text-xs font-mono text-emerald-500">
          Nivel de Riesgo
        </label>
        <select
          {...register("riskLevel")}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 outline-none"
        >
          <option value="LOW">Bajo</option>
          <option value="MEDIUM">Medio</option>
          <option value="HIGH">Alto</option>
          <option value="CRITICAL">Crítico</option>
        </select>
      </div>

      {/* MENSAJE DE ÉXITO */}
      {mensajeExito && (
        <div className="bg-green-500/20 border border-green-500 text-green-400 text-xs font-mono p-3 rounded text-center uppercase tracking-widest">
          PROTOCOLO DE AISLAMIENTO ACTIVADO
        </div>
      )}

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={cargando || !symptoms?.trim()}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded uppercase text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cargando ? "Analizando Muestra..." : "Registrar"}
      </button>
    </form>
  );
}
