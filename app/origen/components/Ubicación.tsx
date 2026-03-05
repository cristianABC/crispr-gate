"use client"
import { useState } from "react";

export default function Ubicacion(){

    const [estado, setEstado] = useState("idle");
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const obtenerUbicacion = () => {

        setEstado("loading");

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                    setCoords({ latitude, longitude });
                    setEstado("success");
                },
                (error) => {
                    console.error("ERROR DE SEÑAL", error);
                    setEstado("error");
                }
            );
        } else {
            setEstado("error");
        }
    }

    return(
        <div className="border-2 border-cyan-500 p-4">
            <h2 className="text-xl font-bold mb-4">Ubicación</h2>

            <button
                onClick={obtenerUbicacion}
                className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
                Obtener Ubicación
            </button>

            {estado === "loading" && (
                <p className="animate-pulse text-yellow-500 mt-2">
                    SINCRONIZANDO CON SATÉLITE...
                </p>
            )}

            {estado === "error" && (
                <p className="bg-red-600 text-white p-2 mt-2">
                    ERROR: GPS BLOQUEADO
                </p>
            )}

            {estado === "success" && coords && (
                <p className="mt-2">
                    LAT: {coords.latitude} | LNG: {coords.longitude}
                </p>
            )}

        </div>
    )
}
