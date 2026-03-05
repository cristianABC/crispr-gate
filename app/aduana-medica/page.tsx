"use client";

import { useEffect, useMemo, useState } from "react";
import { Biohazard } from "lucide-react";
import { toast } from "sonner";

import { certificadosMedicos } from "@/mocks/mocks";
import { cn } from "@/lib/utils";

type VaccineOption = "" | "N-VIR" | "CRISPR-SHIELD" | "OMEGA-GEN";

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export default function AduanaMedicaPage() {
  const [expedientes, setExpedientes] = useState(certificadosMedicos);
  const [selectedId, setSelectedId] = useState(certificadosMedicos[0]?.id ?? "");
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineOption>("");
  const [doseDate, setDoseDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >("unsupported");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }

    setNotificationPermission(Notification.permission);
  }, []);

  const selectedExpediente = useMemo(
    () => expedientes.find((item) => item.id === selectedId),
    [expedientes, selectedId]
  );

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const triggerInfringementAlert = (patientName: string) => {
    if (notificationPermission !== "granted") {
      return;
    }

    new Notification("ALERTA DE INFRACCIÓN", {
      body: `Sujeto no inmunizado detectado: ${patientName}`,
    });
  };

  const handleUpdateDose = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const now = new Date();
    const enteredDate = new Date(doseDate);

    if (doseDate && enteredDate > now) {
      setDateError("ERROR: FECHA TEMPORAL INVÁLIDA");
      return;
    }

    setDateError("");
    setIsLoading(true);

    if (selectedExpediente?.status === "None") {
      triggerInfringementAlert(selectedExpediente.patientName);
    }

    await wait(1500);

    setExpedientes((current) =>
      current.map((item) => {
        if (item.id !== selectedId || !selectedVaccine || !doseDate) {
          return item;
        }

        return {
          ...item,
          vaccineType: selectedVaccine,
          lastDose: doseDate,
          status: "Up-to-date",
        };
      })
    );

    setIsLoading(false);
    setSelectedVaccine("");
    setDoseDate("");
    setSuccessMessage("CERTIFICADO ACTUALIZADO");
    toast.success("CERTIFICADO ACTUALIZADO");
  };

  const canUpdate = Boolean(selectedVaccine);

  return (
    <main className="w-full min-h-screen bg-zinc-50 p-6">
      <section className="mx-auto max-w-5xl space-y-4">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Expedientes médicos
        </h1>

        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-medium text-zinc-900">
              Registro de Dosis
            </h2>

            {notificationPermission === "granted" ? (
              <button
                type="button"
                disabled
                className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-600"
              >
                ALERTAS ACTIVAS
              </button>
            ) : (
              <button
                type="button"
                onClick={requestNotificationPermission}
                disabled={notificationPermission === "unsupported"}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                ACTIVAR ALERTAS DE RED
              </button>
            )}
          </div>

          <form onSubmit={handleUpdateDose} className="grid gap-3 md:grid-cols-4">
            <label className="space-y-1 text-sm text-zinc-700">
              <span className="font-medium">Viajero</span>
              <select
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
              >
                {expedientes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.patientName}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-zinc-700">
              <span className="font-medium">Tipo de vacuna</span>
              <select
                value={selectedVaccine}
                onChange={(event) =>
                  setSelectedVaccine(event.target.value as VaccineOption)
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seleccionar</option>
                <option value="N-VIR">N-VIR</option>
                <option value="CRISPR-SHIELD">CRISPR-SHIELD</option>
                <option value="OMEGA-GEN">OMEGA-GEN</option>
              </select>
            </label>

            <label className="space-y-1 text-sm text-zinc-700">
              <span className="font-medium">Fecha</span>
              <input
                type="date"
                value={doseDate}
                onChange={(event) => setDoseDate(event.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                required
              />
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={!canUpdate || isLoading}
                className="w-full rounded-md border border-zinc-300 bg-zinc-900 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Sincronizando Registro Médico..." : "Actualizar"}
              </button>
            </div>
          </form>

          {dateError && (
            <p className="mt-3 text-sm font-semibold text-red-600">{dateError}</p>
          )}
          {successMessage && (
            <p className="mt-3 text-sm font-semibold text-green-600">
              {successMessage}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {expedientes.map((expediente) => {
            const hasNoStatus = expediente.status === "None";
            const isCriticalRisk =
              expediente.riskLevel === "HIGH" ||
              expediente.riskLevel === "CRITICAL";
            const isNVirVaccine = expediente.vaccineType === "N-VIR";

            return (
              <article
                key={expediente.id}
                className={cn(
                  "rounded-lg border border-zinc-200 bg-white p-4",
                  hasNoStatus && "bg-red-50",
                  isCriticalRisk && "border-4 border-double border-red-500"
                )}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-zinc-500">{expediente.id}</p>
                    <h2 className="text-base font-medium text-zinc-900">
                      {expediente.patientName}
                    </h2>
                  </div>

                  {hasNoStatus && (
                    <div className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-semibold text-red-700">
                      <Biohazard className="h-3.5 w-3.5" />
                      PELIGRO BIOLÓGICO
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-sm text-zinc-700">
                  <p>
                    <span className="font-medium">Vacuna:</span>{" "}
                    <span
                      className={cn(
                        isNVirVaccine && "font-bold text-blue-600"
                      )}
                    >
                      {expediente.vaccineType}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Última dosis:</span>{" "}
                    {expediente.lastDose}
                  </p>
                  <p>
                    <span className="font-medium">Estado:</span> {expediente.status}
                  </p>
                  <p>
                    <span className="font-medium">Riesgo:</span> {expediente.riskLevel}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}