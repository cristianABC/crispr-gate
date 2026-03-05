"use client";

import * as React from "react";
import { toast } from "sonner";

import type { AuditoriaImplante } from "@/types/types.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Categoria = AuditoriaImplante["category"];
type Riesgo = AuditoriaImplante["riskLevel"];

const neonGold =
  "text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]";

const illegalRow =
  "bg-red-900/70 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_10px,rgba(0,0,0,0)_10px,rgba(0,0,0,0)_20px)]";

const inputStyle =
  "border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500";

function nextAuditId(items: AuditoriaImplante[]) {
  const max = items.reduce((acc, it) => {
    const n = Number(it.id.replace(/^AUD-/, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 700);
  return `AUD-${max + 1}`;
}

const copiarAlPortapapeles = async (id: string) => {
  try {
    await navigator.clipboard.writeText(id);
  } catch (err) {
    throw err;
  }
};

export default function ImplantesPage() {
  const [items, setItems] = React.useState<AuditoriaImplante[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const [ownerName, setOwnerName] = React.useState("");
  const [implantModel, setImplantModel] = React.useState("");
  const [marketValue, setMarketValue] = React.useState<string>("");
  const [category, setCategory] = React.useState<Categoria>("Cyberware");
  const [riskLevel, setRiskLevel] = React.useState<Riesgo>("LOW");
  const [isConfiscated, setIsConfiscated] = React.useState(false);

  const [fiscalError, setFiscalError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch("/api/implantes", { cache: "no-store" });
        const data = (await res.json()) as AuditoriaImplante[];
        if (isMounted) setItems(data);
      } catch {
        toast.error("Fallo al cargar registros");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const isModelValid = implantModel.trim().length >= 5;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = Number(marketValue);
    if (!Number.isFinite(value) || value <= 0) {
      setFiscalError("VALORACIÓN FISCAL NULA");
      return;
    }

    setFiscalError(null);
    setSubmitLoading(true);

    toast.message("Tasando Activo en Red...");

    try {
      await fetch("/api/implantes", { method: "POST" });

      const nuevo: AuditoriaImplante = {
        id: nextAuditId(items),
        ownerName: ownerName.trim() || "N/A",
        implantModel: implantModel.trim(),
        marketValue: value,
        category,
        riskLevel,
        isConfiscated,
      };

      setItems((prev) => [nuevo, ...prev]);

      toast.success("ACTIVO REGISTRADO Y TASADO");

      setOwnerName("");
      setImplantModel("");
      setMarketValue("");
      setCategory("Cyberware");
      setRiskLevel("LOW");
      setIsConfiscated(false);
    } catch {
      toast.error("Error al registrar el activo");
    } finally {
      setSubmitLoading(false);
    }
  };

  const onCopy = async (id: string) => {
    try {
      await copiarAlPortapapeles(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("ERROR: PORTAPAPELES BLOQUEADO");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-3 border-zinc-800 bg-zinc-950/60">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">
            Activos auditados (10 registros)
          </CardTitle>

          {loading ? (
            <span className="text-xs text-zinc-400">Cargando…</span>
          ) : (
            <span className="text-xs text-zinc-400">{items.length} activos</span>
          )}
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/70 text-xs text-zinc-300">
                <tr>
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Propietario</th>
                  <th className="px-3 py-3">Modelo</th>
                  <th className="px-3 py-3">Categoría</th>
                  <th className="px-3 py-3">Riesgo</th>
                  <th className="px-3 py-3 text-right">Valor</th>
                  <th className="px-3 py-3 text-right">Reporte</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {items.slice(0, 10).map((it) => {
                  const rowClass =
                    it.category === "Illegal-Mod" ? illegalRow : "bg-zinc-950";

                  const valueClass =
                    it.marketValue > 20000 ? neonGold : "text-zinc-200";

                  return (
                    <tr key={it.id} className={`${rowClass} relative`}>
                      <td className="px-3 py-3 font-mono text-xs text-zinc-200 relative">
                        {it.id}

                        {it.isConfiscated && (
                          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 rotate-[-12deg] rounded-md border border-red-400/60 bg-red-950/50 px-2 py-1 text-[10px] font-bold tracking-wider text-red-200">
                            ACTIVO INCAUTADO
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-3 text-zinc-200">{it.ownerName}</td>
                      <td className="px-3 py-3 text-zinc-200">
                        {it.implantModel}
                      </td>
                      <td className="px-3 py-3 text-zinc-200">{it.category}</td>

                      <td className="px-3 py-3">
                        <span className="rounded-md border border-zinc-700 bg-zinc-900/60 px-2 py-1 text-xs text-zinc-200">
                          {it.riskLevel}
                        </span>
                      </td>

                      <td
                        className={`px-3 py-3 text-right font-semibold ${valueClass}`}
                      >
                        {it.marketValue.toLocaleString()} ₡
                      </td>

                      <td className="px-3 py-3 text-right">
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-8 border border-zinc-800 bg-zinc-900/60 px-3 text-xs text-zinc-200 hover:bg-zinc-900"
                          onClick={() => onCopy(it.id)}
                        >
                          {copiedId === it.id ? "✓ ¡COPIADO!" : "📋 Copiar ID"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-zinc-800 bg-zinc-950/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">
            Reporte de incautación (nuevo implante)
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Propietario</Label>
              <Input
                id="owner"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Nombre del portador"
                className={inputStyle}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo del implante</Label>
              <Input
                id="model"
                value={implantModel}
                onChange={(e) => setImplantModel(e.target.value)}
                placeholder="Ej: Neural-Link-Z"
                className={inputStyle}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Valor de mercado (₡)</Label>
              <Input
                id="value"
                value={marketValue}
                onChange={(e) => setMarketValue(e.target.value)}
                placeholder="Ej: 45000"
                className={inputStyle}
              />

              {fiscalError && (
                <p className="text-sm font-semibold text-red-400">
                  {fiscalError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={submitLoading || !isModelValid}
            >
              {submitLoading ? "Tasando Activo en Red..." : "Registrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}