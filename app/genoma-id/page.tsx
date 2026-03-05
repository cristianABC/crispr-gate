"use client";
import { ViajeroIdentidad } from "@/types/types.interface";
import { useEffect, useEffectEvent, useState } from "react";
import { GET } from "@/app/api/genoma-id/route";
import LabRecordCard from "./components/lab-record-card";

export default function GenomaIdPage() {
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
        <div>
            <h1 className="p-2 pb-5 font-bold text-foreground text-3xl">Visualización Lab Records</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {labRecords.length > 0 && labRecords.map((record) =>(
                    <LabRecordCard key={record.id} labRecord={record} />
                ))}
            </div>
        </div>
    );
}