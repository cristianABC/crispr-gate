# 🛰️ Sector 1: Registro Neón - Protocolo de Acceso

**Misión:** Construir la terminal de entrada para los viajeros del Nexo. La estabilidad del sistema depende de tu gestión de estados y la lectura de energía de la terminal.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `registrosIniciales` en tarjetas (Cards) con estética neón.
* **Lógica de Estilo (Condicionales de Riesgo):**
    * Si `riskLevel` es **CRITICAL**: Fondo de la card en `bg-red-200` (Alerta máxima).
    * Si `riskLevel` es **HIGH**: Texto del título en `text-red-600`.

### 2. Registro de Sujetos (Crear)
Implementar un formulario con los siguientes requisitos de **Feedback de Usuario**:
* **Estado de Carga:** Al enviar, mostrar "Procesando..." y deshabilitar el botón durante **1.5 segundos** (simulación de red).
* **Validación:** * Si el nombre está vacío, mostrar un mensaje de error en rojo.
    * **Bloqueo:** El botón de envío debe estar `disabled` mientras el campo de nombre sea inválido.
* **Éxito:** Al finalizar, limpiar los campos y mostrar un **Toast** (o mensaje destacado) en verde: *"PROTOCOLO COMPLETADO"*.

### 3. Hardware: Monitoreo de Energía (Battery API)
Usa la API del navegador para mostrar el estado de la terminal en el encabezado.
* **Reglas de UI:**
    * 🔋 `bateria > 30`: Fondo verde.
    * ⚠️ `bateria < 30`: Fondo amarillo.
    * 🚨 `bateria < 15`: El número del porcentaje debe ponerse en **rojo**.

#### 💡 Pista Técnica (Uso dentro de un useEffect):
```typescript
// Inicialización
const battery = await (navigator as any).getBattery(); 

// Lectura de valores
const level = battery.level * 100; // 0 a 100
const isCharging = battery.charging; // true/false