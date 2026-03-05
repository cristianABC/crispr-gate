'use client'

import { useState, useEffect } from 'react'
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
import type { RutaViajero } from '@/types/types.interface'
import { RutaViajeroForm, rutaViajeroSchema } from './lib/types/logistica'
import * as logisticaStorage from './lib/api/logistica-storage'


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

// ── Tabla ──────────────────────────────────────────────────────────────────
function TablaRutas({ rutas }: { rutas: RutaViajero[] }) {
  const riskClass: Record<string, string> = {
    LOW:      'bg-green-900 text-green-300',
    MEDIUM:   'bg-yellow-900 text-yellow-300',
    HIGH:     'bg-orange-900 text-orange-300',
    CRITICAL: 'bg-red-900 text-red-300',
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">🗺️ Registros de Tráfico Espacial</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="text-left py-2 pr-3">ID</th>
              <th className="text-left py-2 pr-3">Viajero</th>
              <th className="text-left py-2 pr-3">Nave</th>
              <th className="text-left py-2 pr-3">Planeta Origen</th>
              <th className="text-left py-2 pr-3">Distancia (AL)</th>
              <th className="text-left py-2 pr-3">Coords</th>
              <th className="text-left py-2">Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((r) => {
              const isLongTrip = r.distanceLightYears > 5
              const isUnknown = r.originPlanet === 'Desconocido'
              const isCritical = r.riskLevel === 'CRITICAL'

              return (
                <tr
                  key={r.id}
                  className={`border-b ${isLongTrip ? 'bg-slate-900' : 'hover:bg-muted/40'} transition-colors`}
                >
                  <td className="py-2 pr-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="py-2 pr-3">{r.travelerName}</td>
                  <td className="py-2 pr-3 font-medium">
                    {isCritical
                      ? <span className="text-red-400">{r.shipModel} <span className="text-xs bg-red-900 text-red-300 px-1 rounded ml-1">INSPECCIÓN REQUERIDA</span></span>
                      : r.shipModel}
                    {isLongTrip && <span className="ml-2 text-xs">🚀 VIAJE LARGO</span>}
                  </td>
                  <td className="py-2 pr-3">
                    {isUnknown
                      ? <span className="text-yellow-400 font-bold">{r.originPlanet} ❓</span>
                      : r.originPlanet}
                  </td>
                  <td className="py-2 pr-3 font-mono">{r.distanceLightYears}</td>
                  <td className="py-2 pr-3 font-mono text-xs">
                    {r.coordinates.lat.toFixed(2)}, {r.coordinates.lng.toFixed(2)}
                  </td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-1 rounded font-mono ${riskClass[r.riskLevel]}`}>
                      {r.riskLevel}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ── Formulario ─────────────────────────────────────────────────────────────
function FormularioRuta({ onCreated }: { onCreated: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const form = useForm<RutaViajeroForm>({
    resolver: zodResolver(rutaViajeroSchema),
    defaultValues: {
      travelerName: '', originPlanet: '', shipModel: '',
      coordinates: { lat: 0, lng: 0 },
      riskLevel: 'LOW', distanceLightYears: 1,
    },
  })

  // El botón Asignar se deshabilita si lat o lng no son numéricos válidos
  const lat = form.watch('coordinates.lat')
  const lng = form.watch('coordinates.lng')
  const coordsValid = !isNaN(Number(lat)) && !isNaN(Number(lng)) &&
    String(lat) !== '' && String(lng) !== ''

  const onSubmit = async (data: RutaViajeroForm) => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    logisticaStorage.create(data)
    setIsSubmitting(false)
    setToast('PLAN DE VUELO AUTORIZADO')
    form.reset()
    onCreated()
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">➕ Asignar Vector de Salto</h3>

      {toast && (
        <div className="mb-4 bg-green-900/60 border border-green-500 rounded-md px-4 py-3 text-green-400 font-mono text-sm">
          ✅ {toast}
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
                  <input type="number" step="0.1" min="0.1" {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="coordinates.lat" render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada LAT</FormLabel>
                <FormControl><Input placeholder="Ej: 441.22" {...field} /></FormControl>
                <FormDescription className="text-xs">Solo formato numérico</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="coordinates.lng" render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada LNG</FormLabel>
                <FormControl><Input placeholder="Ej: 88.10" {...field} /></FormControl>
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
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function OrigenPage() {
  const [rutas, setRutas] = useState<RutaViajero[]>([])
  const reload = () => setRutas(logisticaStorage.getAll())
  useEffect(() => { reload() }, [])

  return (
    <div className="space-y-6">
      <TablaRutas rutas={rutas} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioRuta onCreated={reload} />
        <GpsPanel />
      </div>
    </div>
  )
}