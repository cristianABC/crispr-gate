import { Card, CardHeader } from "@/components/ui/card";
import { ViajeroIdentidad } from "@/types/types.interface";

interface LabRecordCardProps {
    labRecord: ViajeroIdentidad;
}

export default function LabRecordCard({labRecord}: LabRecordCardProps) {
    return (
        <Card className={`${labRecord.dnaPurity < 50 ? "border-orange-500": ""}`}>
            <CardHeader>
                <div className="flex justify-center">
                    <span>
                        {labRecord.name}
                    </span> 
                </div>  
            </CardHeader>
        </Card>
    )
}