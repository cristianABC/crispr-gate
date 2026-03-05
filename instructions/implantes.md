# ⚖️ Sector 7: Auditoría de Implantes - Control de Activos

**Misión:** Operar como el brazo fiscal de **CRISPR-GATE**. Tu misión es tasar el valor de cada mejora cibernética que cruza la frontera y asegurar que los impuestos al "Aumento Humano" sean recaudados. Debes ser capaz de extraer rápidamente los identificadores de contrabando para reportarlos a la unidad central.

---

## 1. Visualización (Listar)

- **Mapeo:** Renderizar los 10 registros de `registrosAuditoria` en una tabla de activos financieros.
- **Lógica de Estilo (Condicionales de Tasación):**
  - Si **marketValue > 20000**: El texto del precio debe aparecer en **dorado neón** con un efecto de brillo (`drop-shadow`).
  - Si **category es 'Illegal-Mod'**: La fila o tarjeta debe tener un fondo rayado de advertencia o color `bg-red-900` de alta intensidad.
  - Si **isConfiscated es true**: Mostrar un sello o texto superpuesto que diga "ACTIVO INCAUTADO".

## 2. Reporte de Incautación (Crear)

Implementar un formulario para tasar y registrar un nuevo implante. Debe incluir **Feedback de Usuario**:

- **Estado de Carga:** Al enviar, mostrar el mensaje "Tasando Activo en Red..." y deshabilitar el botón durante **1.5 segundos**.
- **Validación:**
  - Si el valor del mercado es **0 o negativo**, mostrar error en rojo: "VALORACIÓN FISCAL NULA".
- **Bloqueo:** El botón de "Registrar" debe estar `disabled` si el modelo del implante tiene menos de 5 caracteres.
- **Éxito:** Al finalizar, mostrar un **Toast** o mensaje en verde: _"ACTIVO REGISTRADO Y TASADO"_ y añadirlo a la lista.

## 3. Hardware: Trasvase de Datos (Clipboard API)

Usa el portapapeles del sistema para copiar los códigos de serie de los implantes y facilitar su reporte a las autoridades.

- **Reglas de UI:**
  - 📋 **Copiar:** Cada registro debe tener un botón de "Copiar ID". Al presionarlo, el ID del activo debe guardarse en el portapapeles.
  - 🟢 **Confirmación Visual:** Tras copiar, el botón debe cambiar temporalmente (2 segundos) a un check o texto verde que diga "¡COPIADO!".
  - ⚠️ **Privacidad:** Si la API falla, mostrar un mensaje: "ERROR: PORTAPAPELES BLOQUEADO".

### 💡 Pista Técnica:

```typescript
// Copiado de datos al portapapeles
const copiarAlPortapapeles = async (id: string) => {
  try {
    await navigator.clipboard.writeText(id);
    console.log("ID transferido con éxito");
  } catch (err) {
    console.error("Fallo en el trasvase", err);
  }
};
```

## Estructura de Datos

```typescript
export interface AuditoriaImplante {
  id: string;
  ownerName: string;
  implantModel: string;
  marketValue: number; // Valor en créditos galácticos
  category: "Cyberware" | "Biotech" | "Illegal-Mod";
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  isConfiscated: boolean;
}
```

## API Endpoints

- **GET /api/implantes** - Obtiene todos los registros de auditoría
- **POST /api/implantes** - Registra un nuevo activo (delay de 1.5s simulado)

## Características Implementadas

✅ Tabla con estilos condicionales basados en valor y categoría
✅ Formulario con validación en tiempo real
✅ Botón deshabilitado hasta que el modelo tenga 5+ caracteres
✅ Estado de carga durante el envío
✅ Toast de confirmación al registrar
✅ Clipboard API con feedback visual
✅ Manejo de errores del portapapeles
✅ Diseño cyberpunk con colores neón
