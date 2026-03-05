"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ViajeroIdentidad } from "@/types/types.interface"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { GET } from "@/app/api/genoma-id/route"
import { Textarea } from "@/components/ui/textarea"

interface FormInputs {
    sujetoId: string;
    stringEditar: string;
}

export default function Formulario() {
    const [sujetos, setAllSujetos] = useState<ViajeroIdentidad[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        resetField
    } = useForm<FormInputs>({
        mode: "onChange",
        defaultValues: {
            sujetoId: "",
            stringEditar: ""
        }
    });

    const selectedSujeto = watch("sujetoId");
    const stringEditar = watch("stringEditar");

    useEffect(() => {
        const fetchData = async () => {
            const res = GET();
            if (res.ok) {
                const data = await res.json();
                setAllSujetos(data);
            } else {
                console.error("Error");
            }
        };
        fetchData();
    }, [])

    const onSubmit = (data: FormInputs) => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("BASE DE DATOS ACTUALIZADA");
            resetField("stringEditar");
        }, 1500);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-2xl font-bold">Formulario de Edición</h2>
                <p className="text-sm">Seleccione un sujeto de la base de datos</p>
                <select
                    {...register("sujetoId", { required: true })}>
                    <option value="">Seleccionar Sujeto</option>
                    {sujetos?.map((sujeto) => (
                        <option key={sujeto.id} value={sujeto.id}>
                            {sujeto.name}
                        </option>
                    ))}
                </select>
            </CardHeader>

            <CardContent>
                <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <label className="">Feedback de usuario</label>
                    <Textarea
                        {...register("stringEditar", {
                            required: "Este campo es obligatorio"
                        })}
                        placeholder={"Escriba el feedback"}
                    />

                    {errors.stringEditar && (
                        <span className="text-xs text-red-500 font-bold">
                            {errors.stringEditar.message}
                        </span>
                    )}
                    <Button type="submit" disabled={!selectedSujeto || !stringEditar || isSubmitting}>
                        {isSubmitting ? "Analizando secuencia..." : "Insertar Cambios"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}