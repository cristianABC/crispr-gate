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

        const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        const recognition = new Speech();
        recognition.lang = "es-CO";
        recognition.continuous = true
        recognition.interimResults = false

        recognition.onresult = (event: any) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                setTexto(prev => prev + event.results[i][0].transcript);
            }
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
        <div className='flex justify-center font-mono text-4xl'>
            {!haysoporte ? (
                <p className="text-red-500">HARDWARE DE VOZ NO DETECTADO</p>
            ) : (
                <button
                    onClick={escuchando ? detener : iniciar}
                    className={escuchando
                        ? "bg-red-600 text-white px-4 py-2 rounded"
                        : "text-emerald-400 underline px-4 py-2 rounded border border-emerald-400 shadow-[0_0_8px_#34d399,0_0_20px_#34d399] hover:shadow-[0_0_12px_#34d399,0_0_40px_#34d399] transition-shadow duration-300"
                    }
                >
                    {escuchando ? "ESCANEANDO VOZ..." : "INICIAR DICTADO"}
                </button>
            )}
        </div>
        <h1 className='text-2xl font-bold'>Resultado:</h1>
        <p>{texto}</p>
    </div>
  )
}