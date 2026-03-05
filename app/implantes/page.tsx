"use client";

import { useState, useEffect } from "react";
import { AuditoriaImplante } from "@/types/types.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ImplantesPage() {
  const [registros, setRegistros] = useState<AuditoriaImplante[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [ownerName, setOwnerName] = useState("");
  const [implantModel, setImplantModel] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [category, setCategory] = useState<"Cyberware" | "Biotech" | "Illegal-Mod">("Cyberware");
  const [riskLevel, setRiskLevel] = useState<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">("LOW");
  const [isConfiscated, setIsConfiscated] = useState(false);

  // Validation errors
  const [valueError, setValueError] = useState("");

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      const res = await fetch("/api/implantes");
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      console.error("Error fetching registros:", error);
      toast.error("Error al cargar registros");
    } finally {
      setLoading(false);
    }
  };

  const copiarAlPortapapeles = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Fallo en el trasvase", err);
      toast.error("ERROR: PORTAPAPELES BLOQUEADO");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const value = parseFloat(marketValue);
    if (value <= 0) {
      setValueError("VALORACIÓN FISCAL NULA");
      return;
    }
    setValueError("");

    setSubmitting(true);

    try {
      const res = await fetch("/api/implantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName,
          implantModel,
          marketValue: value,
          category,
          riskLevel,
          isConfiscated,
        }),
      });

      if (res.ok) {
        toast.success("ACTIVO REGISTRADO Y TASADO");
        
        const newRegistro: AuditoriaImplante = {
          id: `AUD-${Date.now()}`,
          ownerName,
          implantModel,
          marketValue: value,
          category,
          riskLevel,
          isConfiscated,
        };
        setRegistros([newRegistro, ...registros]);

        setOwnerName("");
        setImplantModel("");
        setMarketValue("");
        setCategory("Cyberware");
        setRiskLevel("LOW");
        setIsConfiscated(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar activo");
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = implantModel.length >= 5 && marketValue && parseFloat(marketValue) > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gold-400 text-xl">Cargando registros de auditoría...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-yellow-400">
            AUDITORÍA DE IMPLANTES
        </h1>
        <p className="text-cyan-300 mb-8">Control de Activos Cibernéticos - CRISPR-GATE</p>

        {/* Formulario de Registro */}
        <Card className="mb-8 bg-gray-900 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-yellow-400">Reporte de Incautación</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerName" className="text-cyan-400">
                    Propietario
                  </Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                    className="bg-gray-800 border-cyan-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="implantModel" className="text-cyan-400">
                    Modelo de Implante (mín. 5 caracteres)
                  </Label>
                  <Input
                    id="implantModel"
                    value={implantModel}
                    onChange={(e) => setImplantModel(e.target.value)}
                    required
                    minLength={5}
                    className="bg-gray-800 border-cyan-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="marketValue" className="text-cyan-400">
                    Valor de Mercado (Créditos)
                  </Label>
                  <Input
                    id="marketValue"
                    type="number"
                    value={marketValue}
                    onChange={(e) => {
                      setMarketValue(e.target.value);
                      setValueError("");
                    }}
                    required
                    className="bg-gray-800 border-cyan-600 text-white"
                  />
                  {valueError && (
                    <p className="text-red-500 text-sm mt-1">{valueError}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category" className="text-cyan-400">
                    Categoría
                  </Label>
                  <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                    <SelectTrigger className="bg-gray-800 border-cyan-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cyberware">Cyberware</SelectItem>
                      <SelectItem value="Biotech">Biotech</SelectItem>
                      <SelectItem value="Illegal-Mod">Illegal-Mod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="riskLevel" className="text-cyan-400">
                    Nivel de Riesgo
                  </Label>
                  <Select value={riskLevel} onValueChange={(v: any) => setRiskLevel(v)}>
                    <SelectTrigger className="bg-gray-800 border-cyan-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                      <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isConfiscated"
                    title="Marcar si el activo ha sido incautado"
                    checked={isConfiscated}
                    onChange={(e) => setIsConfiscated(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isConfiscated" className="text-cyan-400">
                    Activo Incautado
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || submitting}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
              >
                {submitting ? "Tasando Activo en Red..." : "Registrar Activo"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabla de Registros */}
        <div className="bg-gray-900 border border-cyan-500 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-yellow-400">ID</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Propietario</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Modelo</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Valor</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Categoría</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Riesgo</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Estado</th>
                  <th className="px-4 py-3 text-left text-yellow-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr
                    key={registro.id}
                    className={`border-t border-gray-700 ${
                      registro.category === "Illegal-Mod" ? "bg-red-900/30" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-cyan-300">{registro.id}</td>
                    <td className="px-4 py-3 text-white">{registro.ownerName}</td>
                    <td className="px-4 py-3 text-white">{registro.implantModel}</td>
                    <td
                      className={`px-4 py-3 font-bold ${
                        registro.marketValue > 20000
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                      style={
                        registro.marketValue > 20000
                          ? { filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))" }
                          : {}
                      }
                    >
                      {registro.marketValue.toLocaleString()} CR
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          registro.category === "Illegal-Mod"
                            ? "bg-red-600 text-white"
                            : registro.category === "Cyberware"
                            ? "bg-blue-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {registro.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          registro.riskLevel === "CRITICAL"
                            ? "bg-red-600"
                            : registro.riskLevel === "HIGH"
                            ? "bg-orange-600"
                            : registro.riskLevel === "MEDIUM"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        } text-white`}
                      >
                        {registro.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {registro.isConfiscated && (
                        <span className="text-red-500 font-bold text-xs">
                          ACTIVO INCAUTADO
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        onClick={() => copiarAlPortapapeles(registro.id)}
                        className={`${
                          copiedId === registro.id
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-cyan-600 hover:bg-cyan-700"
                        } text-white`}
                      >
                        {copiedId === registro.id ? "✓ ¡COPIADO!" : "Copiar ID"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}