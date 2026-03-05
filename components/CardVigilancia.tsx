"use client"

import { SujetoVigilancia } from "@/types/types.interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"

export default function CardVigilancia({ sujeto }: { sujeto: SujetoVigilancia }) {
    
    // Clases condicionales para el fondo y borde
    const cardClasses = `relative transition-all ${
        sujeto.isWanted 
            ? "bg-red-900/20 border-red-500 animate-pulse-border" 
            : ""
    }`

    // Función para obtener el color del badge según el nivel de riesgo
    const getRiskLevelColor = (level: string) => {
        switch(level) {
            case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500'
            case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
            case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500'
            case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500'
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500'
        }
    }

    // Función para obtener el color del threat level
    const getThreatLevelColor = (level: string) => {
        switch(level) {
            case 'MINIMAL': return 'bg-green-500/20 text-green-400 border-green-500'
            case 'STABLE': return 'bg-blue-500/20 text-blue-400 border-blue-500'
            case 'ALARMING': return 'bg-orange-500/20 text-orange-400 border-orange-500'
            case 'EXTREME': return 'bg-red-500/20 text-red-400 border-red-500'
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500'
        }
    }

    return (
        <Card className={cardClasses}>
            {/* Banner de OBJETIVO PRIORITARIO si threatLevel es EXTREME */}
            {sujeto.threatLevel === 'EXTREME' && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 font-bold text-sm tracking-wider z-10 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    OBJETIVO PRIORITARIO
                    <AlertTriangle className="w-4 h-4" />
                </div>
            )}

            <CardHeader className={sujeto.threatLevel === 'EXTREME' ? 'mt-10' : ''}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                            {sujeto.name}
                            {/* Icono de escudo verde si threatLevel es MINIMAL */}
                            {sujeto.threatLevel === 'MINIMAL' && (
                                <div className="flex items-center gap-1 text-green-400" title="Sujeto verificado">
                                    <Shield className="w-5 h-5 fill-green-400" />
                                    <span className="text-xs font-normal">Verificado</span>
                                </div>
                            )}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mt-1">
                            ID: {sujeto.id}
                        </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                        
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Última Ofensa:</span>
                        <span className="font-medium text-right">{sujeto.lastOffense}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Orden de Captura:</span>
                        <span className={`font-bold ${sujeto.isWanted ? 'text-red-400' : 'text-green-400'}`}>
                            {sujeto.isWanted ? "SÍ" : "NO"}
                        </span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Nivel de Riesgo:</span>
                        <span className="font-medium">{sujeto.riskLevel}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Nivel de Amenaza:</span>
                        <span className="font-medium">{sujeto.threatLevel}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}