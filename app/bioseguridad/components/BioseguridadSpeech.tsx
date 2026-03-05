"use client"
import { useRef, useState } from 'react'

export default function BioseguridadSpeech() {
    const [texto, setTexto] = useState("")
    const [escuchando, setEscuchando] = useState(false)
    const recognitionRef = useRef<any>(null)

    const iniciar = () => {
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
  return (
    <div>
        <div className='flex justify-center text-purple-500 underline font-bold text-3xl'>
            <button onClick={escuchando? detener : iniciar}>
                {escuchando? "ESCANEANDO VOZ..." : "INICIAR DICTADO"}
            </button>
        </div>
        <h1 className='text-2xl font-bold'>Resultado:</h1>
        <p className=''>{texto}</p>
    </div>
  )
}