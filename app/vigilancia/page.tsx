'use client';
import React from "react";
import { SujetoVigilancia } from "@/types/types.interface";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CardVigilancia from "@/components/CardVigilancia";

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
                <CardVigilancia key={sujeto.id} sujeto={sujeto} />
            ))}
    </div>




  );
}