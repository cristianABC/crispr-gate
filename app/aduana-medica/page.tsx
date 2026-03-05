"use client";

import * as React from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CertificadoVacuna } from "@/types/types.interface";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isFutureDateISO(isoDate: string) {
  if (!isoDate) return false;
  // comparamos yyyy-mm-dd
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayISO = `${yyyy}-${mm}-${dd}`;
  return isoDate > todayISO;
}

export default function AduanaMedicaPage() {
  const [data, setData] = React.useState<CertificadoVacuna[]>([]);
  const [loadingList, setLoadingList] = React.useState(true);

  // Notification permission
  const [notifPermission, setNotifPermission] = React.useState<
    NotificationPermission | "unsupported"
  >("default");

  // Form state
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [vaccineType, setVaccineType] = React.useState<
    CertificadoVacuna["vaccineType"] | ""
  >("");
  const [doseDate, setDoseDate] = React.useState<string>("");

  const [submitting, setSubmitting] = React.useState(false);
  const [dateError, setDateError] = React.useState<string>("");

  async function load() {
    setLoadingList(true);
    try {
      const res = await fetch("/api/aduana-medica", { cache: "no-store" });
      const json = (await res.json()) as CertificadoVacuna[];
      setData(json);
    } finally {
      setLoadingList(false);
    }
  }

  React.useEffect(() => {
    load();

    // detectar soporte + permiso actual
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotifPermission("unsupported");
      return;
    }
    setNotifPermission(Notification.permission);
  }, []);

  const selected = React.useMemo(
    () => data.find((x) => x.id === selectedId),
    [data, selectedId]
  );

  async function requestNotifPermission() {
    if (notifPermission === "unsupported") {
      toast.error("Tu navegador no soporta Notification API.");
      return;
    }
    const p = await Notification.requestPermission();
    setNotifPermission(p);
    if (p === "granted") toast.success("ALERTAS ACTIVAS");
    else toast.warning("Permiso de alertas no concedido.");
  }

  function maybeFireMedicalAlertIfNone(cert: CertificadoVacuna) {
    // Regla: Disparo al intentar registrar a alguien con status 'None'
    if (cert.status !== "None") return;

    if (notifPermission !== "granted") {
      // igual avisamos en UI
      toast.warning("Sujeto sin inmunización (sin permiso de alerta).");
      return;
    }

    // NOTA: usa un icon que exista. Si creas /public/alert-icon.png, cámbialo aquí.
    new Notification("CRISPR-GATE: ALERTA MÉDICA", {
      body: "Sujeto sin esquema de vacunación detectado en Aduana.",
      icon: "/file.svg",
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDateError("");

    if (!selected) {
      toast.error("Selecciona un expediente.");
      return;
    }
    if (!vaccineType) return; // botón ya debería estar disabled

    // Validación: fecha futura => error en rojo
    if (doseDate && isFutureDateISO(doseDate)) {
      setDateError("ERROR: FECHA TEMPORAL INVÁLIDA");
      return;
    }

    // Disparo: si el sujeto está en status None
    maybeFireMedicalAlertIfNone(selected);

    // Estado de carga: 1.5s (el POST ya espera 1500ms)
    setSubmitting(true);
    toast.loading("Sincronizando Registro Médico...");

    try {
      const res = await fetch("/api/aduana-medica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          vaccineType,
          lastDose: doseDate || new Date().toISOString().slice(0, 10),
        }),
      });

      if (!res.ok) throw new Error("POST failed");

      // Éxito: toast verde + reflejar cambio en lista
      toast.dismiss();
      toast.success("CERTIFICADO ACTUALIZADO");

      setData((prev) =>
        prev.map((c) =>
          c.id === selected.id
            ? {
                ...c,
                vaccineType: vaccineType as CertificadoVacuna["vaccineType"],
                lastDose: doseDate || new Date().toISOString().slice(0, 10),
                status: "Up-to-date",
              }
            : c
        )
      );

      // reset parcial
      setDoseDate("");
      setVaccineType("");
      setSelectedId("");
    } catch {
      toast.dismiss();
      toast.error("No se pudo actualizar el certificado.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Sector 4: Aduana Médica - Control de Inmunización
        </h1>
        <p className="text-sm text-muted-foreground">
          Misión: Verificar certificados de vacunación sintética y emitir alertas
          al sistema central cuando se detecte un sujeto sin protección biológica.
        </p>
      </div>

      {/* 3) Hardware: Notification permission */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">3. Hardware: Alerta de Infracción</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {notifPermission === "granted" ? (
            <Button variant="secondary" disabled>
              ALERTAS ACTIVAS
            </Button>
          ) : (
            <Button
              onClick={requestNotifPermission}
              disabled={notifPermission === "unsupported"}
            >
              ACTIVAR ALERTAS DE RED
            </Button>
          )}
          {notifPermission === "unsupported" && (
            <p className="text-sm text-red-600">
              Tu navegador no soporta Notification API.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Disparo: si intentas registrar a alguien con status <b>None</b>, se
            lanza una notificación real (si hay permiso).
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* 1) Visualización */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">1. Visualización (Listar)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingList ? (
              <p className="text-sm text-muted-foreground">Cargando expedientes…</p>
            ) : (
              <div className="space-y-3">
                {data.slice(0, 10).map((c) => {
                  const dangerNone = c.status === "None";
                  const nvir = c.vaccineType === "N-VIR";
                  const highBorder = c.riskLevel === "HIGH" || c.riskLevel === "CRITICAL";

                  return (
                    <div
                      key={c.id}
                      className={cx(
                        "rounded-lg border p-3",
                        dangerNone && "bg-red-50",
                        highBorder && "border-red-600 border-4 border-double"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold">{c.patientName}</div>
                          <div className="text-xs text-muted-foreground">
                            ID: {c.id} • Risk: {c.riskLevel} • Status: {c.status}
                          </div>
                        </div>

                        {dangerNone && (
                          <span className="text-xs font-semibold text-red-700">
                            ☣ PELIGRO BIOLÓGICO
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-sm">
                        Vacuna:{" "}
                        <span
                          className={cx(
                            nvir && "font-bold text-blue-600"
                          )}
                        >
                          {c.vaccineType}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          • Última dosis: {c.lastDose}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2) Registro de Dosis */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">2. Registro de Dosis (Crear)</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Expediente</Label>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un viajero…" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.slice(0, 10).map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.patientName} ({c.id}) — status: {c.status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de vacuna</Label>
                <Select
                  value={vaccineType}
                  onValueChange={(v) => setVaccineType(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona vacuna…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N-VIR">N-VIR</SelectItem>
                    <SelectItem value="CRISPR-SHIELD">CRISPR-SHIELD</SelectItem>
                    <SelectItem value="OMEGA-GEN">OMEGA-GEN</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Bloqueo: “Actualizar” queda deshabilitado si no seleccionas vacuna.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Fecha de la dosis (YYYY-MM-DD)</Label>
                <Input
                  type="date"
                  value={doseDate}
                  onChange={(e) => setDoseDate(e.target.value)}
                />
                {dateError && (
                  <p className="text-sm font-semibold text-red-600">{dateError}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting || !vaccineType}
                className="w-full"
              >
                {submitting ? "Sincronizando Registro Médico..." : "Actualizar"}
              </Button>

              <p className="text-xs text-muted-foreground">
                Estado de carga: al registrar, se muestra “Sincronizando…” y se
                deshabilita el botón ~1.5s.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}