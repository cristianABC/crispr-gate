
//Se crean cards visualizacion
//Mapeo: Renderizar los 10 registros de certificadosMedicos en una tabla o lista de expedientes.
//Lógica de Estilo (Condicionales Médicos):
//Si status es 'None': La tarjeta debe tener un fondo rojo tenue (bg-red-50) y un icono de "PELIGRO BIOLÓGICO".
//Si vaccineType es 'N-VIR': El nombre de la vacuna debe aparecer en negrita y azul.
//Si riskLevel es 'HIGH' o 'CRITICAL': El borde de la tarjeta debe ser doble y de color rojo.

"use client";

import { CertificadoVacuna } from "@/types/types.interface";
export default function CardCertificado({ cert }: { cert: CertificadoVacuna }) {
    //rojo si es None el status
  const fondo = cert.status === "None" ? "bg-red-50" : "bg-white";
    //doble borde si es high o criticial
  const borde =
    cert.riskLevel === "HIGH" || cert.riskLevel === "CRITICAL" ? "border-4 border-double border-red-600": "border border-gray-300";
//Si vaccineType es 'N-VIR': El nombre de la vacuna debe aparecer en negrita y azul.
  const vacunaEstilo =
    cert.vaccineType === "N-VIR" ? "font-bold text-blue-600" : "";

  return (
    <div className={`p-4 rounded-lg shadow ${fondo} ${borde}`}>

      {cert.status === "None" && (
        <p className="text-red-700 font-bold">PELIGRO BIOLÓGICO</p>
      )}

      <h2 className="text-lg font-bold">{cert.patientName}</h2>

      <p>ID: {cert.id}</p>

      <p className={vacunaEstilo}>
        Vacuna: {cert.vaccineType}
      </p>

      <p>Última dosis: {cert.lastDose}</p>

      <p>Status: {cert.status}</p>

      <p>Risk Level: {cert.riskLevel}</p>

    </div>
  );
}