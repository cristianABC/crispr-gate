import { RutaViajero } from '@/types/types.interface'
import { z } from 'zod'

export const rutaViajeroSchema = z.object({
    travelerName: z.string().min(2, 'Mínimo 2 caracteres').max(100),
    originPlanet: z.string().min(2, 'Mínimo 2 caracteres').max(100),
    coordinates: z.object({
        lat: z.coerce.number(),
        lng: z.coerce.number(),
    }),
    shipModel: z.string().min(2).max(100),
    riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('LOW'),
    distanceLightYears: z.coerce.number().positive('DISTANCIA NULA DETECTADA'),
})

export type RutaViajeroForm = z.infer<typeof rutaViajeroSchema>
export type RutaViajeroInput = Omit<RutaViajero, 'id'>