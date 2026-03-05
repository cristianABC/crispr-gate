import { RutaViajero } from "@/types/types.interface"
import { RutaViajeroInput } from "../types/logistica"

const STORAGE_KEY = 'logistica_rutas'

const MOCK_DATA: RutaViajero[] = [
  { id: 'VEC-001', travelerName: 'Kael Dorn',     originPlanet: 'Zorrath',     coordinates: { lat: 441.22, lng: 88.10 }, shipModel: 'Kraken-IX',     riskLevel: 'LOW',      distanceLightYears: 3.2  },
  { id: 'VEC-002', travelerName: 'Desconocido',   originPlanet: 'Desconocido', coordinates: { lat: 892.55, lng: 11.99 }, shipModel: 'Phantom MkII',  riskLevel: 'HIGH',     distanceLightYears: 8.7  },
  { id: 'VEC-003', travelerName: 'Lyra Messen',   originPlanet: 'Exara-4',     coordinates: { lat: 210.44, lng: 55.32 }, shipModel: 'Nebula Drift',  riskLevel: 'LOW',      distanceLightYears: 1.1  },
  { id: 'VEC-004', travelerName: 'CLASIFICADO',   originPlanet: 'Desconocido', coordinates: { lat: 999.99, lng: 0.01  }, shipModel: 'WraithCruiser', riskLevel: 'CRITICAL', distanceLightYears: 12.0 },
  { id: 'VEC-005', travelerName: 'Sora Vantis',   originPlanet: 'Kelion-7',    coordinates: { lat: 133.10, lng: 42.80 }, shipModel: 'SolarBarge',    riskLevel: 'LOW',      distanceLightYears: 0.8  },
  { id: 'VEC-006', travelerName: 'Orin Thex',     originPlanet: 'Meridian-3',  coordinates: { lat: 560.88, lng: 77.44 }, shipModel: 'DarkMatter II', riskLevel: 'MEDIUM',   distanceLightYears: 6.3  },
  { id: 'VEC-007', travelerName: 'CLASIFICADO',   originPlanet: 'Desconocido', coordinates: { lat: 711.33, lng: 22.17 }, shipModel: 'StormReaper',   riskLevel: 'CRITICAL', distanceLightYears: 9.1  },
  { id: 'VEC-008', travelerName: 'Mira Solenne',  originPlanet: 'Veltrex',     coordinates: { lat: 305.77, lng: 61.55 }, shipModel: 'AuroraCraft',   riskLevel: 'MEDIUM',   distanceLightYears: 2.4  },
  { id: 'VEC-009', travelerName: 'Vox Draken',    originPlanet: 'Praxis-9',    coordinates: { lat: 628.91, lng: 39.03 }, shipModel: 'VoidWalker',    riskLevel: 'HIGH',     distanceLightYears: 7.6  },
  { id: 'VEC-010', travelerName: 'Aleth Corryn',  originPlanet: 'Zorrath',     coordinates: { lat: 489.02, lng: 50.66 }, shipModel: 'EclipseMark3',  riskLevel: 'LOW',      distanceLightYears: 4.5  },
]

const initializeStorage = () => {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA))
  }
}

const generateId = () =>
  `VEC-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

export const getAll = (): RutaViajero[] => {
  if (typeof window === 'undefined') return []
  initializeStorage()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch { return [] }
}

export const create = (data: RutaViajeroInput): RutaViajero => {
  if (typeof window === 'undefined') throw new Error('localStorage no disponible')
  initializeStorage()
  const all = getAll()
  const newRecord: RutaViajero = { id: generateId(), ...data }
  all.push(newRecord)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  return newRecord
}