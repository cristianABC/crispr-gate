"use client";
import { ViajeroIdentidad } from "@/types/types.interface";
import LabRecordCard from "../components/lab-record-card";
import { useEffect, useEffectEvent, useState } from "react";
import { GET } from "@/app/api/genoma-id/route";

export default function VisualizationPage() {
    const mock: ViajeroIdentidad = { id: "ID-201", name: "Kaelen Voss", dnaPurity: 98, modifications: ["Filtro respiratorio", "Filtro respiratorio"], riskLevel: "CRITICAL", lastScan: "2026-03-01" }
    const [labRecords, setLabRecords] = useState<ViajeroIdentidad[]>([]);

    const setLabData = useEffectEvent((data) => {
        setLabRecords(data);
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = GET();
            if (res.ok) {
                const data = await res.json()
                setLabData(data);
            } else {
                console.error("Error fetching data")
            }
        }
        fetchData();
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {labRecords.length > 0 && labRecords.map((record) =>(
                <LabRecordCard key={record.id} labRecord={record} />
            ))}
        </div>
    );
}