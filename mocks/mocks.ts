import { AuditoriaImplante, CertificadoVacuna, PerfilBiometrico, ReporteSalud, RutaViajero, SujetoVigilancia, ViajeroIdentidad, ViajeroRegistro } from "@/types/types.interface";


export const registrosIniciales: ViajeroRegistro[] = [
    { id: "RN-101", name: "Kaelen Voss", origin: "Estación Lunar Alpha", arrivalTime: "08:30", riskLevel: "LOW", accessCode: "AX-99" },
    { id: "RN-102", name: "Lyra Belacqua", origin: "Cinturón de Asteroides", arrivalTime: "09:15", riskLevel: "CRITICAL", accessCode: "ZV-44" },
    { id: "RN-103", name: "Jaxxon D'ane", origin: "Marte Sector 4", arrivalTime: "10:00", riskLevel: "MEDIUM", accessCode: "MK-12" },
    { id: "RN-104", name: "Sora Maru", origin: "Tierra - Neo Tokyo", arrivalTime: "10:45", riskLevel: "LOW", accessCode: "TK-05" },
    { id: "RN-105", name: "Elias Thorne", origin: "Europa (Satélite)", arrivalTime: "11:20", riskLevel: "HIGH", accessCode: "EU-88" },
    { id: "RN-106", name: "Mina Harker", origin: "Estación Orbital Gaia", arrivalTime: "12:05", riskLevel: "LOW", accessCode: "GA-21" },
    { id: "RN-107", name: "Vahn Rix", origin: "Desconocido", arrivalTime: "13:40", riskLevel: "CRITICAL", accessCode: "XX-00" },
    { id: "RN-108", name: "Talia Al-Ghul", origin: "Tierra - Ciudad Libre", arrivalTime: "14:15", riskLevel: "MEDIUM", accessCode: "CL-55" },
    { id: "RN-109", name: "Cyrus Vane", origin: "Minas de Titán", arrivalTime: "15:00", riskLevel: "HIGH", accessCode: "TN-33" },
    { id: "RN-110", name: "Nova Prime", origin: "Sector Próxima B", arrivalTime: "16:25", riskLevel: "LOW", accessCode: "PB-77" }
];


export const registrosLaboratorio: ViajeroIdentidad[] = [
    { id: "ID-201", name: "Kaelen Voss", dnaPurity: 98, modifications: ["Filtro respiratorio"], riskLevel: "LOW", lastScan: "2026-03-01" },
    { id: "ID-202", name: "Lyra Belacqua", dnaPurity: 45, modifications: ["Enlace Neural", "Reflejos de Combate"], riskLevel: "CRITICAL", lastScan: "2026-03-02" },
    { id: "ID-203", name: "Jaxxon D'ane", dnaPurity: 88, modifications: ["Huesos Reforzados"], riskLevel: "MEDIUM", lastScan: "2026-02-28" },
    { id: "ID-204", name: "Sora Maru", dnaPurity: 100, modifications: [], riskLevel: "LOW", lastScan: "2026-03-04" },
    { id: "ID-205", name: "Elias Thorne", dnaPurity: 60, modifications: ["Procesador Táctico", "Piel Sintética"], riskLevel: "HIGH", lastScan: "2026-03-03" },
    { id: "ID-206", name: "Mina Harker", dnaPurity: 99, modifications: ["Memoria Fotográfica"], riskLevel: "LOW", lastScan: "2026-03-01" },
    { id: "ID-207", name: "Vahn Rix", dnaPurity: 30, modifications: ["Módulo de Sigilo", "Supresor de Emociones"], riskLevel: "CRITICAL", lastScan: "2026-03-04" },
    { id: "ID-208", name: "Talia Al-Ghul", dnaPurity: 85, modifications: ["Longevidad Celular"], riskLevel: "MEDIUM", lastScan: "2026-01-15" },
    { id: "ID-209", name: "Cyrus Vane", dnaPurity: 75, modifications: ["Brazo Hidráulico"], riskLevel: "HIGH", lastScan: "2026-02-20" },
    { id: "ID-210", name: "Nova Prime", dnaPurity: 95, modifications: ["Traductor Universal"], riskLevel: "LOW", lastScan: "2026-03-02" }
];

export const reportesSanitarios: ReporteSalud[] = [
    { id: "BIO-301", patientName: "Kaelen Voss", temperature: 36.5, symptoms: "Ninguno", status: "STABLE", riskLevel: "LOW" },
    { id: "BIO-302", patientName: "Lyra Belacqua", temperature: 39.2, symptoms: "Tos seca, fatiga extrema", status: "INFECTED", riskLevel: "CRITICAL" },
    { id: "BIO-303", patientName: "Jaxxon D'ane", temperature: 37.8, symptoms: "Dolor muscular leve", status: "QUARANTINE", riskLevel: "MEDIUM" },
    { id: "BIO-304", patientName: "Sora Maru", temperature: 36.2, symptoms: "Ninguno", status: "STABLE", riskLevel: "LOW" },
    { id: "BIO-305", patientName: "Elias Thorne", temperature: 38.5, symptoms: "Dificultad respiratoria", status: "INFECTED", riskLevel: "HIGH" },
    { id: "BIO-306", patientName: "Mina Harker", temperature: 36.8, symptoms: "Ninguno", status: "STABLE", riskLevel: "LOW" },
    { id: "BIO-307", patientName: "Vahn Rix", temperature: 40.1, symptoms: "Fiebre hemorrágica", status: "INFECTED", riskLevel: "CRITICAL" },
    { id: "BIO-308", patientName: "Talia Al-Ghul", temperature: 37.0, symptoms: "Náuseas", status: "QUARANTINE", riskLevel: "MEDIUM" },
    { id: "BIO-309", patientName: "Cyrus Vane", temperature: 38.2, symptoms: "Migraña intensa", status: "QUARANTINE", riskLevel: "HIGH" },
    { id: "BIO-310", patientName: "Nova Prime", temperature: 36.4, symptoms: "Ninguno", status: "STABLE", riskLevel: "LOW" }
];

export const certificadosMedicos: CertificadoVacuna[] = [
    { id: "MED-401", patientName: "Kaelen Voss", vaccineType: "CRISPR-SHIELD", lastDose: "2025-12-10", status: "Up-to-date", riskLevel: "LOW" },
    { id: "MED-402", patientName: "Lyra Belacqua", vaccineType: "N-VIR", lastDose: "N/A", status: "None", riskLevel: "CRITICAL" },
    { id: "MED-403", patientName: "Jaxxon D'ane", vaccineType: "OMEGA-GEN", lastDose: "2026-01-05", status: "Pending", riskLevel: "MEDIUM" },
    { id: "MED-404", patientName: "Sora Maru", vaccineType: "CRISPR-SHIELD", lastDose: "2026-02-20", status: "Up-to-date", riskLevel: "LOW" },
    { id: "MED-405", patientName: "Elias Thorne", vaccineType: "N-VIR", lastDose: "N/A", status: "None", riskLevel: "HIGH" },
    { id: "MED-406", patientName: "Mina Harker", vaccineType: "OMEGA-GEN", lastDose: "2026-01-30", status: "Up-to-date", riskLevel: "LOW" },
    { id: "MED-407", patientName: "Vahn Rix", vaccineType: "N-VIR", lastDose: "2024-11-11", status: "Pending", riskLevel: "CRITICAL" },
    { id: "MED-408", patientName: "Talia Al-Ghul", vaccineType: "CRISPR-SHIELD", lastDose: "2025-05-20", status: "Up-to-date", riskLevel: "MEDIUM" },
    { id: "MED-409", patientName: "Cyrus Vane", vaccineType: "N-VIR", lastDose: "N/A", status: "None", riskLevel: "HIGH" },
    { id: "MED-410", patientName: "Nova Prime", vaccineType: "OMEGA-GEN", lastDose: "2026-02-15", status: "Up-to-date", riskLevel: "LOW" }
];

export const registrosLogistica: RutaViajero[] = [
    { id: "LOG-501", travelerName: "Kaelen Voss", originPlanet: "Luna Alpha", coordinates: { lat: 0.12, lng: -0.45 }, shipModel: "Falcon-X", riskLevel: "LOW", distanceLightYears: 0.001 },
    { id: "LOG-502", travelerName: "Lyra Belacqua", originPlanet: "Cinturón de Asteroides", coordinates: { lat: 45.12, lng: 120.33 }, shipModel: "Rocinante", riskLevel: "CRITICAL", distanceLightYears: 2.4 },
    { id: "LOG-503", travelerName: "Jaxxon D'ane", originPlanet: "Marte Sector 4", coordinates: { lat: -15.4, lng: 30.1 }, shipModel: "Red-Dust", riskLevel: "MEDIUM", distanceLightYears: 0.5 },
    { id: "LOG-504", travelerName: "Sora Maru", originPlanet: "Tierra - Neo Tokyo", coordinates: { lat: 35.6, lng: 139.7 }, shipModel: "Shinkansen-S", riskLevel: "LOW", distanceLightYears: 0.0 },
    { id: "LOG-505", travelerName: "Elias Thorne", originPlanet: "Europa (Satélite)", coordinates: { lat: 70.0, lng: -10.5 }, shipModel: "Ice-Breaker", riskLevel: "HIGH", distanceLightYears: 3.8 },
    { id: "LOG-506", travelerName: "Mina Harker", originPlanet: "Estación Gaia", coordinates: { lat: 0.0, lng: 0.0 }, shipModel: "Orbit-Z", riskLevel: "LOW", distanceLightYears: 0.02 },
    { id: "LOG-507", travelerName: "Vahn Rix", originPlanet: "Desconocido", coordinates: { lat: -89.9, lng: 179.9 }, shipModel: "Ghost-P", riskLevel: "CRITICAL", distanceLightYears: 15.2 },
    { id: "LOG-508", travelerName: "Talia Al-Ghul", originPlanet: "Tierra - Ciudad Libre", coordinates: { lat: 25.0, lng: -45.0 }, shipModel: "Shadow-1", riskLevel: "MEDIUM", distanceLightYears: 0.0 },
    { id: "LOG-509", travelerName: "Cyrus Vane", originPlanet: "Minas de Titán", coordinates: { lat: -22.5, lng: 150.8 }, shipModel: "Heavy-Lifter", riskLevel: "HIGH", distanceLightYears: 5.1 },
    { id: "LOG-510", travelerName: "Nova Prime", originPlanet: "Proxima B", coordinates: { lat: 10.2, lng: -10.2 }, shipModel: "Alpha-Cent", riskLevel: "LOW", distanceLightYears: 4.2 }
];

export const archivosBiometricos: PerfilBiometrico[] = [
    { id: "BIO-601", subjectName: "Kaelen Voss", fingerprintHash: "0x882A", eyeColor: "Blue", height: 182, riskLevel: "LOW", isArchived: true },
    { id: "BIO-602", subjectName: "Lyra Belacqua", fingerprintHash: "0xBC11", eyeColor: "Amber", height: 165, riskLevel: "CRITICAL", isArchived: false },
    { id: "BIO-603", subjectName: "Jaxxon D'ane", fingerprintHash: "0xFF90", eyeColor: "Cybernetic", height: 195, riskLevel: "MEDIUM", isArchived: true },
    { id: "BIO-604", subjectName: "Sora Maru", fingerprintHash: "0x1122", eyeColor: "Blue", height: 160, riskLevel: "LOW", isArchived: true },
    { id: "BIO-605", subjectName: "Elias Thorne", fingerprintHash: "0x77EE", eyeColor: "Green", height: 178, riskLevel: "HIGH", isArchived: false },
    { id: "BIO-606", subjectName: "Mina Harker", fingerprintHash: "0x3344", eyeColor: "Amber", height: 170, riskLevel: "LOW", isArchived: true },
    { id: "BIO-607", subjectName: "Vahn Rix", fingerprintHash: "0x0000", eyeColor: "Cybernetic", height: 188, riskLevel: "CRITICAL", isArchived: false },
    { id: "BIO-608", subjectName: "Talia Al-Ghul", fingerprintHash: "0xAA55", eyeColor: "Green", height: 168, riskLevel: "MEDIUM", isArchived: true },
    { id: "BIO-609", subjectName: "Cyrus Vane", fingerprintHash: "0xCCBB", eyeColor: "Blue", height: 185, riskLevel: "HIGH", isArchived: false },
    { id: "BIO-610", subjectName: "Nova Prime", fingerprintHash: "0xDD11", eyeColor: "Amber", height: 172, riskLevel: "LOW", isArchived: true }
];

export const registrosAuditoria: AuditoriaImplante[] = [
    { id: "AUD-701", ownerName: "Kaelen Voss", implantModel: "Filtro-R", marketValue: 2500, category: "Biotech", riskLevel: "LOW", isConfiscated: false },
    { id: "AUD-702", ownerName: "Lyra Belacqua", implantModel: "Neural-Link-Z", marketValue: 45000, category: "Illegal-Mod", riskLevel: "CRITICAL", isConfiscated: true },
    { id: "AUD-703", ownerName: "Jaxxon D'ane", implantModel: "Bone-Reinforcer", marketValue: 8500, category: "Cyberware", riskLevel: "MEDIUM", isConfiscated: false },
    { id: "AUD-704", ownerName: "Sora Maru", implantModel: "N/A", marketValue: 0, category: "Biotech", riskLevel: "LOW", isConfiscated: false },
    { id: "AUD-705", ownerName: "Elias Thorne", implantModel: "Tactical-Proc", marketValue: 32000, category: "Cyberware", riskLevel: "HIGH", isConfiscated: true },
    { id: "AUD-706", ownerName: "Mina Harker", implantModel: "Photo-Memory", marketValue: 1500, category: "Biotech", riskLevel: "LOW", isConfiscated: false },
    { id: "AUD-707", ownerName: "Vahn Rix", implantModel: "Stealth-Module", marketValue: 89000, category: "Illegal-Mod", riskLevel: "CRITICAL", isConfiscated: true },
    { id: "AUD-708", ownerName: "Talia Al-Ghul", implantModel: "Cellular-Longevity", marketValue: 150000, category: "Biotech", riskLevel: "MEDIUM", isConfiscated: false },
    { id: "AUD-709", ownerName: "Cyrus Vane", implantModel: "Hydraulic-Arm", marketValue: 5600, category: "Cyberware", riskLevel: "HIGH", isConfiscated: false },
    { id: "AUD-710", ownerName: "Nova Prime", implantModel: "Universal-Translator", marketValue: 2500, category: "Cyberware", riskLevel: "LOW", isConfiscated: false }
];

export const sujetosVigilancia: SujetoVigilancia[] = [
    { id: "VIG-901", name: "Kaelen Voss", threatLevel: "MINIMAL", lastOffense: "N/A", isWanted: false, riskLevel: "LOW" },
    { id: "VIG-902", name: "Lyra Belacqua", threatLevel: "EXTREME", lastOffense: "Contrabando de Memoria", isWanted: true, riskLevel: "CRITICAL" },
    { id: "VIG-903", name: "Jaxxon D'ane", threatLevel: "STABLE", lastOffense: "Alteración de BIOS", isWanted: false, riskLevel: "MEDIUM" },
    { id: "VIG-904", name: "Sora Maru", threatLevel: "MINIMAL", lastOffense: "N/A", isWanted: false, riskLevel: "LOW" },
    { id: "VIG-905", name: "Elias Thorne", threatLevel: "ALARMING", lastOffense: "Hackeo de Aduanas", isWanted: true, riskLevel: "HIGH" },
    { id: "VIG-906", name: "Mina Harker", threatLevel: "MINIMAL", lastOffense: "N/A", isWanted: false, riskLevel: "LOW" },
    { id: "VIG-907", name: "Vahn Rix", threatLevel: "EXTREME", lastOffense: "Terrorismo Genético", isWanted: true, riskLevel: "CRITICAL" },
    { id: "VIG-908", name: "Talia Al-Ghul", threatLevel: "ALARMING", lastOffense: "Sabotaje Industrial", isWanted: false, riskLevel: "MEDIUM" },
    { id: "VIG-909", name: "Cyrus Vane", threatLevel: "ALARMING", lastOffense: "Robo de Implantes", isWanted: true, riskLevel: "HIGH" },
    { id: "VIG-910", name: "Nova Prime", threatLevel: "MINIMAL", lastOffense: "N/A", isWanted: false, riskLevel: "LOW" }
];