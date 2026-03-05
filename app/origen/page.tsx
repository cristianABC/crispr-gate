"use client";

import { useEffect, useState } from "react";
import { RutaViajero } from "@/types/types.interface";
import CrearVista from "./components/crear-vista";

export default function OrigenPage() {
  const [registros, setRegistros] = useState<RutaViajero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/origen")
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-cyan-400 animate-pulse text-center mt-10">
        CARGANDO REGISTROS DE NAVEGACIÓN...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <CrearVista registros={registros} />
    </div>
  );
}
