"use client";

import { PerfilBiometrico } from "@/types/types.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardBiometriaProps {
  perfil: PerfilBiometrico;
  onCardClick: (nombre: string) => void;
}

export default function CardBiometria({
  perfil,
  onCardClick,
}: CardBiometriaProps) {
  return (
    <Card
      onClick={() => onCardClick(perfil.subjectName)}
      className={`cursor-pointer border-gray-700 bg-gray-900 hover:border-cyan-500 transition-colors ${
        perfil.isArchived ? "opacity-60" : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle
              className={`font-mono text-white text-base ${
                perfil.riskLevel === "CRITICAL" ? "font-bold uppercase" : ""
              }`}
            >
              {perfil.riskLevel === "CRITICAL"
                ? perfil.subjectName.toUpperCase()
                : perfil.subjectName}
            </CardTitle>
            <p className="text-gray-500 text-xs font-mono mt-0.5">
              {perfil.id}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {perfil.eyeColor === "Cybernetic" && (
              <span className="bg-red-900 text-red-300 text-xs font-bold px-2 py-0.5 rounded border border-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]">
                AUMENTO ILEGAL
              </span>
            )}
            {perfil.isArchived && (
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded font-mono">
                EN ARCHIVO
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-xs text-gray-400 font-mono space-y-1">
        <p>
          Hash: <span className="text-cyan-400">{perfil.fingerprintHash}</span>
        </p>
        <p>Ojos: {perfil.eyeColor}</p>
        <p>Altura: {perfil.height} cm</p>
        <p>
          Riesgo:{" "}
          <span
            className={
              perfil.riskLevel === "CRITICAL"
                ? "text-red-400 font-bold"
                : perfil.riskLevel === "HIGH"
                  ? "text-orange-400"
                  : perfil.riskLevel === "MEDIUM"
                    ? "text-yellow-400"
                    : "text-green-400"
            }
          >
            {perfil.riskLevel}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
