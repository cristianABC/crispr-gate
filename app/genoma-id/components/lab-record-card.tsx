import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ViajeroIdentidad } from "@/types/types.interface";

interface LabRecordCardProps {
    labRecord: ViajeroIdentidad;
}

export default function LabRecordCard({labRecord}: LabRecordCardProps) {
    return (
        <Card className={`${labRecord.dnaPurity < 50 ? "border-orange-500": ""}`}>
            <CardHeader>
                
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                        {labRecord.name}
                    </CardTitle>

                    <div className="flex flex-col justify-end">
                        <div className={`flex justify-end ${labRecord.riskLevel === "CRITICAL" ? "text-red-700 animate-pulse font-bold": ""}`}>
                            {labRecord.id}
                        </div>
                    {labRecord.modifications.length > 1 && (
                        <div className="fill-background bg-purple-400 w-fit rounded-full font-medium text-foreground p-2">
                            <p className="text-xs">SUJETO AUMENTADO</p>
                        </div>
                    )}
                </div> 
                        
                    
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-center text-accent-foreground">
                        <p>Fecha de último scan:</p>
                        <p className="italic">{labRecord.lastScan}</p>
                    </div>
                </div>
                 
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-center text-accent-foreground px-2">
                        <p className="font-medium">Nivel de Riesgo:</p>
                        <p className={`${labRecord.riskLevel === "CRITICAL"? "text-red-700 font-medium": ""}`}>{labRecord.riskLevel}</p>
                    </div>
                    <div className="flex flex-col justify-center text-accent-foreground px-2">
                        <p className="font-medium">DNA purity:</p>
                        <p>{labRecord.dnaPurity}</p>
                    </div>
                    <div className="flex flex-col justify-center text-accent-foreground px-2">
                        <p className="font-medium">Modificaciones:</p>
                        {labRecord.modifications.map((mod, index) => (
                            <p key={index}>{mod}</p>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}