# 🧬 Sector 2: Laboratorio de Identidad Genética - Protocolo de ADN

**Misión:** Gestionar el catálogo de pureza genómica y modificaciones corporales. Tu terminal debe ser capaz de identificar alteraciones ilegales y operar la cámara de escaneo para la identificación de sujetos mediante la inspección visual de hardware.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `registrosLaboratorio` en una lista o grid de tarjetas.
* **Lógica de Estilo (Condicionales Visuales):**
    * Si **dnaPurity < 50**: Borde de la card grueso y color `border-orange-500` (Sujeto genéticamente inestable).
    * Si **modifications tiene más de 2 elementos**: Mostrar un badge o etiqueta con el texto "SUJETO AUMENTADO" en color violeta/púrpura.
    * Si **riskLevel es CRITICAL**: El ID del sujeto (ej: ID-202) debe parpadear con la clase `animate-pulse` y texto rojo.

### 2. Gestión de Alteraciones (Crear)
Implementar un formulario para añadir una nueva modificación (string) al registro de un sujeto seleccionado. Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al enviar, mostrar el mensaje "Analizando Secuencia..." y deshabilitar el botón de acción durante **1.5 segundos**.
* **Validación:** * Si el campo de la modificación está vacío, mostrar un mensaje de error en rojo.
    * **Bloqueo:** El botón de "Insertar" debe estar `disabled` mientras el input esté vacío o si no hay un sujeto seleccionado en el estado.
* **Éxito:** Al finalizar la carga, mostrar un **Toast** o mensaje en verde: *"BASE DE DATOS ACTUALIZADA"* y limpiar el campo de entrada.

### 3. Hardware: Estación de Escaneo (MediaDevices API)
Usa la cámara del equipo para simular el escaneo facial del agente en turno dentro de la terminal.
* **Reglas de UI:**
    * 📷 **Cámara Activa:** El recuadro del video (`<video>`) debe tener un borde verde neón sólido.
    * ⚪ **Estado Inicial:** Si la cámara no ha iniciado, mostrar un recuadro negro con el texto "SENSOR STANDBY".
    * ⚠️ **Error de Acceso:** Si el usuario rechaza el permiso de cámara, mostrar el mensaje "ERROR: Hardware no autorizado" en texto rojo.



#### 💡 Pista Técnica (Uso de Refs):
```typescript
// Inicialización (dentro de una función async)
const stream = await navigator.mediaDevices.getUserMedia({ video: true });

// Uso: Asignar el stream al elemento <video> mediante una referencia (ref)
if (videoRef.current) {
  videoRef.current.srcObject = stream;
}