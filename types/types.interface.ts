export interface ViajeroRegistro {
    id: string;
    name: string;
    origin: string;
    arrivalTime: string; // Formato HH:mm
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    accessCode: string; // Generado aleatoriamente
}

export interface ViajeroIdentidad {
    id: string;
    name: string;
    dnaPurity: number; // Porcentaje de 0 a 100
    modifications: string[]; // Lista de implantes o alteraciones
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    lastScan: string; // Fecha del último escaneo
}

export interface ReporteSalud {
    id: string;
    patientName: string;
    temperature: number; // Grados Celsius
    symptoms: string; // Reporte textual
    status: 'QUARANTINE' | 'STABLE' | 'INFECTED';
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface CertificadoVacuna {
    id: string;
    patientName: string;
    vaccineType: 'N-VIR' | 'CRISPR-SHIELD' | 'OMEGA-GEN';
    lastDose: string; // Fecha ISO
    status: 'Up-to-date' | 'Pending' | 'None';
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface RutaViajero {
    id: string;
    travelerName: string;
    originPlanet: string;
    coordinates: { lat: number; lng: number };
    shipModel: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    distanceLightYears: number;
}

export interface PerfilBiometrico {
    id: string;
    subjectName: string;
    fingerprintHash: string; // Hash simulado
    eyeColor: 'Amber' | 'Blue' | 'Green' | 'Cybernetic';
    height: number; // en cm
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    isArchived: boolean;
}

export interface AuditoriaImplante {
    id: string;
    ownerName: string;
    implantModel: string;
    marketValue: number; // Valor en créditos galácticos
    category: 'Cyberware' | 'Biotech' | 'Illegal-Mod';
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    isConfiscated: boolean;
}

export interface SujetoVigilancia {
    id: string;
    name: string;
    threatLevel: 'MINIMAL' | 'STABLE' | 'ALARMING' | 'EXTREME';
    lastOffense: string; // Delito registrado
    isWanted: boolean; // ¿Tiene orden de captura?
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}