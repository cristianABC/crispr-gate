import { ViajeroIdentidad } from "@/types/types.interface";
import { GET } from "../api/genoma-id/route";
import LabRecordCard from "./components/lab-record-card";

export default function GenomaIdPage() {
    const mock: ViajeroIdentidad = { id: "ID-201", name: "Kaelen Voss", dnaPurity: 98, modifications: ["Filtro respiratorio", "Filtro respiratorio"], riskLevel: "CRITICAL", lastScan: "2026-03-01" }

    return (
        <div>
            <LabRecordCard labRecord={mock} />
        </div>
    );
}