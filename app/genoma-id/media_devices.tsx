"use client"

import { useState, useRef, useEffect } from "react"

export default function MediaDevices(){

    const videoRef = useRef<HTMLVideoElement>(null)
    const [estado, setEstado] = useState("standby")

    useEffect(() => {
        camara()
    }, [])

    const infoNotas = {
        standby: { texto: "Iniciando protocolos de hardware...", color: "text-gray-400" },
        activo: { texto: "Transmisión encriptada establecida. El sensor está capturando datos.", color: "text-green-400" },
        error: { texto: "Acceso denegado. Por favor, verifica los permisos de la cámara en tu navegador.", color: "text-red-500" }
    }

    const camara = async () => {

        try{

            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setEstado("activo")

        }catch(error){
            console.log("Error con la camara:", error)
            setEstado("error")

        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            
            <div className="w-[500px] h-[300px] flex items-center justify-center bg-black rounded-xl overflow-hidden border border-gray-800 relative">
                
                {estado === "standby" && (
                    <div className="text-gray-400 font-mono animate-pulse">
                        SENSOR STANDBY
                    </div>
                )}

                {estado === "activo" && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover opacity-60 border-4 border-green-400 rounded-xl"
                    />
                )}

                {estado === "error" && (
                    <div className="text-red-500 font-mono text-center p-4">
                        ERROR: Hardware no autorizado
                    </div>
                )}
            </div>

            
            <div className="w-[500px] p-4 bg-gray-900  border-2 border-blue-500 rounded-2xl shadow-lg">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                    Estado del Sistema
                </p>
                <p className={`text-sm font-mono ${infoNotas[estado as keyof typeof infoNotas].color}`}>
                    {infoNotas[estado as keyof typeof infoNotas].texto}
                </p>
            </div>
        </div>
    )
}