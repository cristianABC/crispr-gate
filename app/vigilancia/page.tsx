'use client';
import React from "react";
import { SujetoVigilancia } from "@/types/types.interface";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Vigilancia() {

    const [sujetos, setSujetos] = React.useState<SujetoVigilancia[]>([]);

    React.useEffect(() => {
        const fetchSujetos = async () => {
        
                const res = await fetch("/api/vigilancia");
                const data = await res.json();
                setSujetos(data);
            
        };

        fetchSujetos();
    }, []);

  return (
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sujetos.map((sujeto) => (
                <Card key={sujeto.id} className="bg-gray-800 text-white">
                    <CardHeader>
                        <CardTitle>{sujeto.name}</CardTitle>
                    </CardHeader>
                    <div className="p-4">
                        <p><strong>Threat Level:</strong> {sujeto.threatLevel}</p>
                        <p><strong>Última Ofensa:</strong> {sujeto.lastOffense}</p>
                        <p><strong>Orden de Captura:</strong> {sujeto.isWanted ? "Sí" : "No"}</p>
                        <p><strong>Risk Level:</strong> {sujeto.riskLevel}</p>
                    </div>
                </Card>
            ))}

    </div>



  );
}