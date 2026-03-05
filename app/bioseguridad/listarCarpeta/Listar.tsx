import { reportesSanitarios } from "../../../mocks/mocks";

export default function RequerimientoListar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {reportesSanitarios.map((reporte) => {
        return (
          <div
            key={reporte.id}
            className={`
              p-4
              ${reporte.status === "INFECTED" ? "border-2 border-red-600 animate-pulse" : "border border-gray-600"}
            `}
          >
            <p>
                ID: {reporte.id}
            </p>

            

            <h2 className="text-lg font-semibold mb-2">
              {reporte.patientName}
            </h2>


            <p
              className={`
                mt-2
                ${reporte.temperature > 38.0 ? "text-red-500 font-bold" : "text-black-200"}
              `}
            >
              Temperatura: {reporte.temperature}°C
            </p>

            <p className="mt-2 text-sm">
              Síntomas: {reporte.symptoms}
            </p>


            {reporte.riskLevel === "LOW" && (
              <span className="mt-3 bg-green-600">
                ESTABLE
              </span>
            )}

          </div>
        );
      })}
      
    </div>
  );
}