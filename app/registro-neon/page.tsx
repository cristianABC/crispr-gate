"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RegistroNeonPage() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const isNameValid = name.trim().length > 0;
  const showNameError = touched && !isNameValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setShowSuccessBanner(false);

    if (!isNameValid) return;

    setIsSubmitting(true);
    await wait(1500);

    setName("");
    setOrigin("");
    setTouched(false);
    setIsSubmitting(false);
    setShowSuccessBanner(true);

    toast.success("PROTOCOLO COMPLETADO", {
      className: "border-green-700 bg-green-100 text-green-800",
    });
  };

  return (
    <main className="mx-auto max-w-2xl">
      <Card className="border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
        <CardHeader>
          <CardTitle className="text-cyan-600">Registro de Sujetos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSuccessBanner && (
            <p className="rounded-md border border-green-700 bg-green-100 px-3 py-2 text-sm font-semibold text-green-800">
              PROTOCOLO COMPLETADO
            </p>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Nombre del viajero"
                aria-invalid={showNameError}
              />
              {showNameError && <p className="text-sm text-red-600">El nombre es obligatorio.</p>}
            </div>

            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origen (opcional)"
            />

            <Button type="submit" disabled={!isNameValid || isSubmitting}>
              {isSubmitting ? "Procesando..." : "Registrar sujeto"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
