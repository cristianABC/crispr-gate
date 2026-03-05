"use client"
import { useRef, useState } from 'react'

export default function BioseguridadSpeech() {
    const [texto, setTexto] = useState("")
    const [escuchando, setEscuchando] = useState(false)
    const recognitionRef = useRef<any>(null)

    const soportaAPI = () => {
        return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
    }

    const iniciar = () => {
        if (!soportaAPI()) return;

        // Inicialización (Verificar compatibilidad con prefijos)
        const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        const recognition = new Speech();
        recognition.lang = "es-CO";
        recognition.continuous = true
        recognition.interimresults = false

        // Uso: Captura de datos
        recognition.onresult = (event: any) => {
        const resultado = event.results[0][0].transcript;
        setTexto(resultado);
        };

        recognition.start()
        recognitionRef.current = recognition
        setEscuchando(true)
    }

    const detener = () => {
        recognitionRef.current?.stop()
        setEscuchando(false)
    }

    const haysoporte = typeof window !== "undefined" && soportaAPI();
  return (
    <div>
        <div className='flex justify-center text-emerald-500 underline font-mono text-4xl'>
            {!haysoporte ? (
                <p className="text-red-500 no-underline">HARDWARE DE VOZ NO DETECTADO</p>
            ) : (
                <button onClick={escuchando ? detener : iniciar}>
                    {escuchando ? "ESCANEANDO VOZ..." : "INICIAR DICTADO"}
                </button>
            )}
        </div>
        <h1 className='text-2xl font-bold'>Resultado:</h1>
        <p>{texto}</p>
    </div>
  )
}