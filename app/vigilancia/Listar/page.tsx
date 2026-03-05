'use client';

import React from "react";
import { SujetoVigilancia } from "@/types/types.interface";
import CardVigilancia from "@/components/CardVigilancia";
import Formulario from "../componentes/Formulario";


type SpeechRecognitionEventType = {
    results: SpeechRecognitionResultList;
};

type SpeechRecognitionType = {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start: () => void;
    onresult: ((event: SpeechRecognitionEventType) => void) | null;
    onerror: (() => void) | null;
};

export default function Vigilancia() {

    const [sujetos, setSujetos] = React.useState<SujetoVigilancia[]>([]);
    const [escuchando, setEscuchando] = React.useState(false);
    const [filtroNombre, setFiltroNombre] = React.useState("");
    const [mensajeError, setMensajeError] = React.useState("");

    React.useEffect(() => {
        const fetchSujetos = async () => {
            const res = await fetch("/api/vigilancia");
            const data: SujetoVigilancia[] = await res.json();
            setSujetos(data);
        };

        fetchSujetos();
    }, []);

    const iniciarRadar = () => {

        const SpeechRecognitionConstructor =
            (window as unknown as {
                SpeechRecognition: new () => SpeechRecognitionType;
                webkitSpeechRecognition: new () => SpeechRecognitionType;
            }).SpeechRecognition ||
            (window as unknown as {
                webkitSpeechRecognition: new () => SpeechRecognitionType;
            }).webkitSpeechRecognition;

        if (!SpeechRecognitionConstructor) {
            setMensajeError("El navegador no soporta reconocimiento de voz");
            return;
        }

        const recognition = new SpeechRecognitionConstructor();

        recognition.lang = "es-CO";
        recognition.continuous = false;
        recognition.interimResults = false;

        setEscuchando(true);
        setMensajeError("");

        recognition.start();

        recognition.onresult = (event) => {
            const nombreDetectado =
                event.results[0][0].transcript.toLowerCase();

            setFiltroNombre(nombreDetectado);
            setEscuchando(false);
        };

        recognition.onerror = () => {
            setEscuchando(false);
        };
    };

    const sujetosFiltrados = sujetos.filter((sujeto) =>
        sujeto.name.toLowerCase().includes(filtroNombre)
    );

    return (
        <div className="p-6">

            {/* BOTÓN DE RADAR */}
            <button
                onClick={iniciarRadar}
                className="bg-black text-white px-4 py-2 rounded mb-6"
            >
                {escuchando
                    ? "🎙️ ESCUCHANDO NOMBRE..."
                    : "🎙️ Buscar por voz"}
            </button>

            {/* ERROR */}
            {filtroNombre && sujetosFiltrados.length === 0 && (
                <p className="text-red-500 font-bold mb-4">
                    SUJETO NO ENCONTRADO EN EL REGISTRO
                </p>
            )}

            {/* GRID DE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sujetosFiltrados.map((sujeto) => (
                    <CardVigilancia
                        key={sujeto.id}
                        sujeto={sujeto}
                    />
                ))}
            </div>
            <Formulario />
        </div>
    );
}