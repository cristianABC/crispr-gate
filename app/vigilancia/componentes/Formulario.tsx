"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  nombre_infractor: string;
  nueva_infraccion: string;
  comentarios: string;
}
const isWanted = true;

export default function Formulario() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      nombre_infractor: "Nombre del infractor ",
      nueva_infraccion: "Descripción de la infracción...",
      comentarios: "Comentarios del agente...",
    }
  });

  const alEnviar = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Datos recibidos:", data);
    toast("BASE DE DATOS DE VIGILANCIA SINCRINIZADA");
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(alEnviar)} className="space-y-4">
      {/* NOMBRE INFRACTOR */}
      <div>
        <label className="text-xs font-mono text-emerald-500">ID sujeto infractor</label>
        <input 
          type="text" 
          {...register("nombre_infractor")} 
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 focus:border-emerald-500 outline-none"
        />
      </div>

      {/* DESCRIPCIÓN NUEVA INFRACCIÓN */}
      <div>
        <label className="text-xs font-mono text-emerald-500">Descripción de la infracción</label>
        <textarea
          {...register("nueva_infraccion", { required: "REPORTE SIN EVIDENCIA" })}
          placeholder="Describa el delito..."
          className={`w-full bg-black border p-2 rounded text-emerald-400 focus:border-emerald-500 outline-none transition-colors ${
            errors.nueva_infraccion ? "border-red-600" : "border-emerald-900/50"
          }`}
        />
        {errors.nueva_infraccion && (
          <p className="text-red-600 text-[10px] font-bold mt-1 animate-pulse">
            {errors.nueva_infraccion.message}
          </p>
        )}
      </div>

      {/* COMENTARIOS (FeedBack de usuario) */}
      <div>
        <label className="text-xs font-mono text-emerald-500">Comentarios</label>
        <textarea 
          {...register("comentarios")}
          className="w-full bg-black border border-emerald-900/50 p-2 rounded text-emerald-400 h-20 outline-none"
        />
      </div>

      {/* BOTÓN DE ACCIÓN */}
      <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-2 rounded uppercase text-xs tracking-widest transition-all">
        Sincronizar Registros
      </button>
    </form>
  );
  }

