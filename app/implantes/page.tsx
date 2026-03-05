"use client";

import * as React from "react";
import { registrosAuditoria } from "@/mocks/mocks";
import type { AuditoriaImplante } from "@/types/types.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type CopyState =
  | { kind: "idle" }
  | { kind: "copied"; id: string }
  | { kind: "error"; id: string };

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function makeId() {
  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `IMP-${uuid.toString().slice(0, 8).toUpperCase()}`;
}

export default function ImplantesPage() {
  const [items, setItems] = React.useState<AuditoriaImplante[]>(
    () => registrosAuditoria.slice(0, 10)
  );

  const [copyState, setCopyState] = React.useState<CopyState>({ kind: "idle" });
  const copyTimer = React.useRef<ReturnType<typeof globalThis.setTimeout> | null>(
    null
  );

  const [ownerName, setOwnerName] = React.useState("");
  const [implantModel, setImplantModel] = React.useState("");
  const [marketValue, setMarketValue] = React.useState<string>("");
  const [category, setCategory] = React.useState<AuditoriaImplante["category"]>(
    "Cyberware"
  );
  const [riskLevel, setRiskLevel] = React.useState<
    AuditoriaImplante["riskLevel"]
  >("LOW");
  const [isConfiscated, setIsConfiscated] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [valueError, setValueError] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimer.current) globalThis.clearTimeout(copyTimer.current);
    };
  }, []);

  // Copiado de datos al portapapeles
  const copiarAlPortapapeles = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyState({ kind: "copied", id });
      if (copyTimer.current) globalThis.clearTimeout(copyTimer.current);
      copyTimer.current = globalThis.setTimeout(() => {
        setCopyState({ kind: "idle" });
      }, 2000);
    } catch (err) {
      console.error("Fallo en el trasvase", err);
      setCopyState({ kind: "error", id });
      if (copyTimer.current) globalThis.clearTimeout(copyTimer.current);
      copyTimer.current = globalThis.setTimeout(() => {
        setCopyState({ kind: "idle" });
      }, 2000);
    }
  };

  const disabledByModel = implantModel.trim().length < 5;
  const parsedValue = Number(marketValue);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValueError(null);

    // Validación: valor 0 o negativo
    if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
      setValueError("VALORACIÓN FISCAL NULA");
      return;
    }

    // Estado de carga 1.5s
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const nuevo: AuditoriaImplante = {
      id: makeId(),
      ownerName: ownerName.trim() || "N/N",
      implantModel: implantModel.trim(),
      marketValue: parsedValue,
      category,
      riskLevel,
      isConfiscated,
    };

    setItems((prev) => [nuevo, ...prev]);

    // Éxito
    toast.success("ACTIVO REGISTRADO Y TASADO");

    // Reset
    setOwnerName("");
    setImplantModel("");
    setMarketValue("");
    setCategory("Cyberware");
    setRiskLevel("LOW");
    setIsConfiscated(false);
    setLoading(false);
  };

  const getActionState = (id: string) => {
    const isCopied = copyState.kind === "copied" && copyState.id === id;
    const isCopyError = copyState.kind === "error" && copyState.id === id;

    let actionLabel = "Copiar ID";
    let actionClass = "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800";

    if (isCopied) {
      actionLabel = "¡COPIADO!";
      actionClass = "border-emerald-800/80 bg-emerald-950/60 text-emerald-200";
    } else if (isCopyError) {
      actionLabel = "ERROR: PORTAPAPELES BLOQUEADO";
      actionClass = "border-red-800/80 bg-red-950/60 text-red-200";
    }

    return { isCopied, actionLabel, actionClass };
  };

  return (
    <div className="w-full space-y-6 rounded-3xl border border-sky-900/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),rgba(12,18,36,0.96)_42%,rgba(3,7,18,1)_78%)] p-4 text-slate-100 shadow-2xl shadow-sky-950/60 md:p-6">
      <div className="space-y-1">
        <h1 className="bg-gradient-to-r from-sky-200 via-cyan-200 to-blue-300 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Sector 7 - Auditoria de Implantes
        </h1>
        <p className="text-sm text-sky-200/75">
          Control de activos y recaudación fiscal para CRISPR-GATE.
        </p>
      </div>

      {/* Reporte de Incautación */}
      <div className="rounded-2xl border border-sky-900/70 bg-slate-950/70 p-4 shadow-lg shadow-sky-950/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Reporte de Incautación</h2>
            <p className="text-sm text-sky-100/70">
              Registrar y tasar un nuevo implante.
            </p>
          </div>

          <div className="text-sm">
            {loading ? (
              <span className="rounded-full border border-sky-700/60 bg-sky-950/50 px-3 py-1 text-sky-200">
                Tasando Activo en Red...
              </span>
            ) : null}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="owner" className="text-sky-100">Propietario</Label>
              <Input
                id="owner"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Nombre del portador"
                className="border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-sky-200/40 focus-visible:ring-sky-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="model" className="text-sky-100">Modelo del Implante</Label>
              <Input
                id="model"
                value={implantModel}
                onChange={(e) => setImplantModel(e.target.value)}
                placeholder="Ej: NEX-ARM V4"
                className="border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-sky-200/40 focus-visible:ring-sky-500"
              />
              <p className="text-xs text-sky-100/55">
                Mínimo 5 caracteres para habilitar el registro.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value" className="text-sky-100">Valor de Mercado</Label>
              <Input
                id="value"
                inputMode="numeric"
                value={marketValue}
                onChange={(e) => setMarketValue(e.target.value)}
                placeholder="Ej: 25000"
                className="border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-sky-200/40 focus-visible:ring-sky-500"
              />
              {valueError ? (
                <p className="text-sm font-semibold text-red-400">
                  {valueError}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label className="text-sky-100">Categoría</Label>
              <select
                className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as AuditoriaImplante["category"])
                }
              >
                <option value="Cyberware">Cyberware</option>
                <option value="Biotech">Biotech</option>
                <option value="Illegal-Mod">Illegal-Mod</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sky-100">Nivel de Riesgo</Label>
              <select
                className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100"
                value={riskLevel}
                onChange={(e) =>
                  setRiskLevel(e.target.value as AuditoriaImplante["riskLevel"])
                }
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm text-sky-100">
              <input
                type="checkbox"
                checked={isConfiscated}
                onChange={(e) => setIsConfiscated(e.target.checked)}
                className="h-4 w-4 accent-sky-500"
              />
              <span>Marcar como incautado</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="submit"
              disabled={loading || disabledByModel}
              className="rounded-xl border border-sky-400/60 bg-gradient-to-r from-sky-200 to-cyan-200 text-slate-900 hover:from-sky-300 hover:to-cyan-300"
            >
              {loading ? "Tasando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </div>

      {/* Tabla / Visualización */}
      <div className="rounded-2xl border border-sky-900/70 bg-slate-950/75 p-4 shadow-lg shadow-sky-950/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Activos en Auditoría</h2>
            <p className="text-sm text-sky-100/70">{items.length} registros</p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="min-w-[900px] w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-sky-200/80">
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">ID</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Propietario</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Modelo</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Categoría</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Riesgo</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Valor</th>
                <th className="border-b border-slate-800 bg-slate-900/80 p-3">Acción</th>
              </tr>
            </thead>

            <tbody>
              {items.map((it) => {
                const isIllegal = it.category === "Illegal-Mod";
                const isGold = it.marketValue > 20000;
                const { isCopied, actionLabel, actionClass } = getActionState(it.id);
                const valueClass = isGold
                  ? "text-yellow-300 [filter:drop-shadow(0_0_8px_rgba(250,204,21,0.85))]"
                  : "";

                return (
                  <tr
                    key={it.id}
                    className="relative transition-colors hover:bg-sky-950/25"
                    style={
                      isIllegal
                        ? {
                            backgroundColor: "rgb(127 29 29)",
                            backgroundImage:
                              "repeating-linear-gradient(135deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 10px, rgba(0,0,0,0.22) 10px, rgba(0,0,0,0.22) 20px)",
                          }
                        : undefined
                    }
                  >
                    <td className="border-b border-slate-800 p-3 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className={isIllegal ? "text-white" : ""}>{it.id}</span>
                        {it.isConfiscated ? (
                          <span className="ml-2 rounded-full border border-red-300/20 bg-red-950/70 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-red-100">
                            ACTIVO INCAUTADO
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td className={`border-b border-slate-800 p-3 text-sm ${isIllegal ? "text-white" : "text-slate-100"}`}>
                      {it.ownerName}
                    </td>

                    <td className={`border-b border-slate-800 p-3 text-sm ${isIllegal ? "text-white" : "text-slate-100"}`}>
                      {it.implantModel}
                    </td>

                    <td className={`border-b border-slate-800 p-3 text-sm ${isIllegal ? "text-white" : "text-slate-100"}`}>
                      {it.category}
                    </td>

                    <td className={`border-b border-slate-800 p-3 text-sm ${isIllegal ? "text-white" : "text-slate-100"}`}>
                      {it.riskLevel}
                    </td>

                    <td className={`border-b border-slate-800 p-3 text-sm font-semibold ${isIllegal ? "text-white" : "text-slate-100"}`}>
                      <span className={valueClass}>
                        {money.format(it.marketValue)}
                      </span>
                    </td>

                    <td className="border-b border-slate-800 p-3">
                      <Button
                        type="button"
                        variant={isCopied ? "secondary" : "outline"}
                        className={`h-9 rounded-xl ${actionClass}`}
                        onClick={() => copiarAlPortapapeles(it.id)}
                      >
                        {actionLabel}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}