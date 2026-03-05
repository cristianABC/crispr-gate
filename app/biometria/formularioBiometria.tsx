"use client";

import { useState } from "react";
import { PerfilBiometrico } from "@/types/types.interface";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialForm = {
  subjectName: "",
  fingerprintHash: "",
  eyeColor: "Blue" as PerfilBiometrico["eyeColor"],
  height: "",
  riskLevel: "LOW" as PerfilBiometrico["riskLevel"],
  isArchived: false,
};

interface FormularioBiometricaProps {
  onNuevoRegistro: (registro: PerfilBiometrico) => void;
}

export default function FormularioBiometrica({
  onNuevoRegistro,
}: FormularioBiometricaProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const h = Number(form.height);
    if (h < 50 || h > 300) {
      setHeightError(true);
      return;
    }
    setHeightError(false);

    setLoading(true);


    await Promise.all([
      fetch("/api/biometria", { method: "POST" }),
      new Promise((res) => setTimeout(res, 1500)),
    ]);

    const nuevo: PerfilBiometrico = {
      id: `BIO-${Date.now()}`,
      subjectName: form.subjectName,
      fingerprintHash: form.fingerprintHash,
      eyeColor: form.eyeColor,
      height: h,
      riskLevel: form.riskLevel,
      isArchived: form.isArchived,
    };

    onNuevoRegistro(nuevo);
    setLoading(false);
    setForm(initialForm);
    setToast("REGISTRO PERSISTIDO");
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-6 right-6 bg-green-500 text-black font-bold px-6 py-3 rounded z-50 shadow-lg">
          {toast}
        </div>
      )}

      <Card className="border-gray-700 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-cyan-400 font-mono tracking-widest">
            ⬡ DIGITALIZACIÓN DE SUJETO
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-gray-400 uppercase text-xs tracking-wider">
                  Nombre del Sujeto
                </Label>
                <Input
                  required
                  value={form.subjectName}
                  onChange={(e) =>
                    setForm({ ...form, subjectName: e.target.value })
                  }
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-400 uppercase text-xs tracking-wider">
                  Fingerprint Hash
                </Label>
                <Input
                  required
                  value={form.fingerprintHash}
                  onChange={(e) =>
                    setForm({ ...form, fingerprintHash: e.target.value })
                  }
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-400 uppercase text-xs tracking-wider">
                  Color de Ojos
                </Label>
                <Select
                  value={form.eyeColor}
                  onValueChange={(val) =>
                    setForm({
                      ...form,
                      eyeColor: val as PerfilBiometrico["eyeColor"],
                    })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Amber">Amber</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Cybernetic">Cybernetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-gray-400 uppercase text-xs tracking-wider">
                  Altura (cm)
                </Label>
                <Input
                  type="number"
                  required
                  value={form.height}
                  onChange={(e) => {
                    setForm({ ...form, height: e.target.value });
                    setHeightError(false);
                  }}
                  aria-invalid={heightError}
                  className="bg-gray-800 border-gray-600 text-white aria-[invalid=true]:border-red-500"
                />
                {heightError && (
                  <p className="text-red-500 text-xs font-mono">
                    VALOR BIOMÉTRICO FUERA DE RANGO
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-gray-400 uppercase text-xs tracking-wider">
                  Nivel de Riesgo
                </Label>
                <Select
                  value={form.riskLevel}
                  onValueChange={(val) =>
                    setForm({
                      ...form,
                      riskLevel: val as PerfilBiometrico["riskLevel"],
                    })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
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

              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="isArchived"
                  checked={form.isArchived}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, isArchived: checked === true })
                  }
                />
                <Label
                  htmlFor="isArchived"
                  className="text-gray-400 text-sm uppercase tracking-wider cursor-pointer"
                >
                  En Archivo
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !form.fingerprintHash}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-mono tracking-widest"
            >
              {loading ? "Escribiendo en Memoria Sólida..." : "⬡ Digitalizar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
