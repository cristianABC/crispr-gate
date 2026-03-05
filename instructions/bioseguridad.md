# ☣️ Sector 3: Bio-Seguridad - Control de Patógenos

**Misión:** Establecer el filtro sanitario de la ciudad. Tu terminal debe monitorear la salud de los viajeros en cuarentena y permitir el registro de síntomas mediante comandos de voz para minimizar el contacto físico con la estación.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `reportesSanitarios` en una lista táctica.
* **Lógica de Estilo (Condicionales Sanitarias):**
    * Si **temperature > 38.0**: El texto de la temperatura debe ser **negrita y rojo** (Alerta de fiebre).
    * Si **status es INFECTED**: La tarjeta debe tener un borde `border-red-600` y una animación `animate-pulse`.
    * Si **riskLevel es LOW**: Mostrar un badge verde con el texto "ESTABLE".

### 2. Registro de Síntomas (Crear)
Implementar un formulario para generar nuevos reportes de salud. Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al enviar el reporte, mostrar el mensaje "Analizando Muestra..." y deshabilitar el botón durante **1.5 segundos**.
* **Validación:** * Si la temperatura es **0 o menor**, mostrar error en rojo: "LECTURA TÉRMICA ERRÓNEA".
    * **Bloqueo:** El botón de "Registrar" debe estar `disabled` si el campo de síntomas está vacío.
* **Éxito:** Al completar el envío, mostrar un **Toast** o mensaje en verde: *"PROTOCOLO DE AISLAMIENTO ACTIVADO"* y limpiar el formulario.

### 3. Hardware: Reporte Manos Libres (Web Speech API)
Usa el micrófono para que el agente dicte los síntomas detectados directamente en el campo de texto.
* **Reglas de UI:**
    * 🎙️ **Escuchando:** Mientras el micrófono esté activo, el botón de dictado debe cambiar a fondo rojo y decir "ESCANEANDO VOZ...".
    * ⚪ **Estado Inicial:** Botón en estilo neón estándar: "INICIAR DICTADO".
    * ⚠️ **Incompatibilidad:** Si el navegador no soporta la API, mostrar un mensaje: "HARDWARE DE VOZ NO DETECTADO".



#### 💡 Pista Técnica:
```typescript
// Inicialización (Verificar compatibilidad con prefijos)
const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new Speech();
recognition.lang = "es-CO";

// Uso: Captura de datos
recognition.onresult = (event: any) => {
  const resultado = event.results[0][0].transcript;
  console.log("SÍNTOMAS DETECTADOS:", resultado);
};