# 🚨 Sector 9: Vigilancia - Radar de Reincidencia

**Misión:** Operar como el radar central de **CRISPR-GATE**. Tu misión es cruzar los datos de los viajeros con la lista de "Más Buscados". Para mantener las manos libres y la vista en la multitud, deberás utilizar comandos de voz para filtrar sospechosos y gestionar el historial criminal de la terminal.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `sujetosVigilancia` en una cuadrícula de monitoreo.
* **Lógica de Estilo (Condicionales de Amenaza):**
    * Si **isWanted es true**: La tarjeta debe tener un fondo rojo translúcido (`bg-red-900/20`) y un borde parpadeante.
    * Si **threatLevel es 'EXTREME'**: Mostrar un banner superior en la card que diga "OBJETIVO PRIORITARIO".
    * Si **riskLevel es 'MINIMAL'**: Mostrar un icono de escudo verde (Sujeto verificado).

### 2. Registro de Infracciones (Crear)
Implementar un formulario para actualizar el historial de delitos de un sujeto. Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al guardar, mostrar el mensaje "Actualizando Historial Criminal..." y deshabilitar el botón durante **1.5 segundos**.
* **Validación:** * Si el campo de la nueva infracción está vacío, mostrar un error en rojo: "REPORTE SIN EVIDENCIA".
    * **Bloqueo:** El botón de "Sincronizar" debe estar `disabled` si el sujeto no tiene una orden de captura activa (`isWanted`).
* **Éxito:** Al finalizar, mostrar un **Toast** o mensaje en verde: *"BASE DE DATOS DE VIGILANCIA SINCRONIZADA"*.

### 3. Hardware: Radar por Voz (Web Speech API)
Usa el micrófono para filtrar la lista de sospechosos mediante el dictado del nombre del sujeto.
* **Reglas de UI:**
    * 🎙️ **Escuchando:** El botón de búsqueda debe cambiar a un icono de radar giratorio o texto "ESCUCHANDO NOMBRE...".
    * 🔍 **Filtro Automático:** Al recibir el resultado de voz, la lista debe filtrarse automáticamente para mostrar solo al sujeto mencionado.
    * ⚠️ **Sin Coincidencia:** Si el nombre dictado no existe en los mocks, mostrar un aviso: "SUJETO NO ENCONTRADO EN EL REGISTRO".



#### 💡 Pista Técnica (Reconocimiento):
```typescript
// Inicialización
const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new Speech();
recognition.lang = "es-CO";
recognition.continuous = false