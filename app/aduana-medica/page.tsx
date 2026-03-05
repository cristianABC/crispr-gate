"use client";

import { useEffect, useState } from "react";
import CardCertificado from "@/components/cardAduana";
import { CertificadoVacuna } from "@/types/types.interface";

export default function CertificadosPage() {

  const [certificados, setCertificados] = useState<CertificadoVacuna[]>([]);

  useEffect(() => {
    const fetchCertificados = async () => {
      const response = await fetch("/api/aduana-medica");
      const data = await response.json();
      setCertificados(data);
    };

    fetchCertificados();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        CERTIFICADOS MÉDICOS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {certificados.map((cert) => (<CardCertificado key={cert.id} cert={cert} />
        ))}

      </div>

    </div>
  );
}