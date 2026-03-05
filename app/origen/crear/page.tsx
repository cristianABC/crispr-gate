'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { RutaViajeroForm, RutaViajeroFormInput, rutaViajeroSchema } from '../lib/types/logistica'

// ── GPS Panel ──────────────────────────────────────────────────────────────
type GpsState = 'idle' | 'searching' | 'found' | 'error'

function GpsPanel() {
  const [gpsState, setGpsState] = useState<GpsState>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  const getLocation = () => {
    setGpsState('searching')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGpsState('found')
      },
      () => setGpsState('error')
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-1">📡 Localización de Estación</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Verifica que la terminal no haya sido desplazada de su zona asignada.
      </p>

      {gpsState === 'idle' && (
        <Button onClick={getLocation} variant="outline">
          🛰️ Sincronizar con Satélite
        </Button>
      )}

      {gpsState === 'searching' && (
        <p className="animate-pulse text-yellow-400 font-mono text-sm">
          SINCRONIZANDO CON SATÉLITE...
        </p>
      )}

      {gpsState === 'found' && coords && (
        <div className="border border-cyan-400 rounded-md p-4 bg-cyan-950/30">
          <p className="text-xs text-cyan-400 font-mono mb-2">📍 UBICACIÓN OBTENIDA</p>
          <p className="font-mono text-sm">LAT: <span className="text-cyan-300">{coords.lat.toFixed(6)}</span></p>
          <p className="font-mono text-sm">LNG: <span className="text-cyan-300">{coords.lng.toFixed(6)}</span></p>
        </div>
      )}

      {gpsState === 'error' && (
        <div className="bg-red-900/60 border border-red-500 rounded-md p-4">
          <p className="font-mono text-sm text-red-400">⚠️ ERROR: GPS BLOQUEADO</p>
        </div>
      )}
    </Card>
  )
}

// ── Formulario ─────────────────────────────────────────────────────────────
export default function CrearPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RutaViajeroFormInput, object, RutaViajeroForm>({
    resolver: zodResolver(rutaViajeroSchema),
    defaultValues: {
      travelerName: '', originPlanet: '', shipModel: '',
      coordinates: { lat: 0, lng: 0 },
      riskLevel: 'LOW', distanceLightYears: 1,
    },
  })

  const lat = form.watch('coordinates.lat')
  const lng = form.watch('coordinates.lng')
  const coordsValid = !isNaN(Number(lat)) && !isNaN(Number(lng)) &&
    String(lat) !== '' && String(lng) !== ''

  const onSubmit = async (data: RutaViajeroForm) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/origen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error al crear el registro')
      router.push('/origen')
    } catch {
      setError('No se pudo crear el registro. Intenta de nuevo.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">➕ Asignar Vector de Salto</h3>

          {error && (
            <div className="mb-4 bg-red-900/60 border border-red-500 rounded-md px-4 py-3 text-red-400 font-mono text-sm">
              ⚠️ {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">

                <FormField control={form.control} name="travelerName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Viajero</FormLabel>
                    <FormControl><Input placeholder="Ej: Kael Dorn" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="originPlanet" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planeta Origen</FormLabel>
                    <FormControl><Input placeholder="Ej: Zorrath" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="shipModel" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de Nave</FormLabel>
                    <FormControl><Input placeholder="Ej: Kraken-IX" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="distanceLightYears" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distancia (Años Luz)</FormLabel>
                    <FormControl>
                      <input type="number" step="0.1" min="0.1" {...field} value={field.value as string | number}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="coordinates.lat" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordenada LAT</FormLabel>
                    <FormControl><Input placeholder="Ej: 441.22" {...field} value={field.value as string | number} /></FormControl>
                    <FormDescription className="text-xs">Solo formato numérico</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="coordinates.lng" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordenada LNG</FormLabel>
                    <FormControl><Input placeholder="Ej: 88.10" {...field} value={field.value as string | number} /></FormControl>
                    <FormDescription className="text-xs">Solo formato numérico</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="riskLevel" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nivel de Riesgo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">LOW</SelectItem>
                        <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                        <SelectItem value="HIGH">HIGH</SelectItem>
                        <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

              </div>

              <Button type="submit" disabled={isSubmitting || !coordsValid} className="w-full">
                {isSubmitting ? '⏳ Calculando Vector de Salto...' : '🚀 Asignar Ruta'}
              </Button>
            </form>
          </Form>
        </Card>

        <GpsPanel />
      </div>
    </div>
  )
}
