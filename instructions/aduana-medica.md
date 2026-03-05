# 🏥 Sector 4: Aduana Médica - Control de Inmunización

**Misión:** Actuar como el guardián de la salud pública del Nexo. Tu función es verificar los certificados de vacunación sintética y emitir alertas inmediatas al sistema central cuando se detecte un sujeto sin la protección biológica requerida.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `certificadosMedicos` en una tabla o lista de expedientes.
* **Lógica de Estilo (Condicionales Médicos):**
    * Si **status es 'None'**: La tarjeta debe tener un fondo rojo tenue (`bg-red-50`) y un icono de "PELIGRO BIOLÓGICO".
    * Si **vaccineType es 'N-VIR'**: El nombre de la vacuna debe aparecer en **negrita y azul**.
    * Si **riskLevel es 'HIGH' o 'CRITICAL'**: El borde de la tarjeta debe ser doble y de color rojo.

### 2. Registro de Dosis (Crear)
Implementar un formulario para actualizar el esquema de vacunación de un viajero. Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al registrar la dosis, mostrar el mensaje "Sincronizando Registro Médico..." y deshabilitar el botón durante **1.5 segundos**.
* **Validación:** * Si la fecha ingresada es superior a la fecha actual, mostrar error en rojo: "ERROR: FECHA TEMPORAL INVÁLIDA".
    * **Bloqueo:** El botón de "Actualizar" debe estar `disabled` si no se ha seleccionado un tipo de vacuna del desplegable.
* **Éxito:** Al finalizar, mostrar un **Toast** o mensaje en verde: *"CERTIFICADO ACTUALIZADO"* y reflejar el cambio en la lista.

### 3. Hardware: Alerta de Infracción (Notifications API)
Usa el sistema de notificaciones del sistema operativo para alertar sobre sujetos no inmunizados.
* **Reglas de UI:**
    * 🔔 **Solicitud:** Al cargar la sección, un botón debe permitir "ACTIVAR ALERTAS DE RED".
    * 🟢 **Autorizado:** Si el permiso es concedido, el botón debe quedar oculto o deshabilitado con el texto "ALERTAS ACTIVAS".
    * ⚠️ **Disparo:** Al intentar registrar a alguien con estatus 'None', debe saltar una notificación real en el escritorio del agente.



#### 💡 Pista Técnica:
```typescript
// Inicialización (Solicitud de permiso)
const permission = await Notification.requestPermission();

// Uso: Disparar alerta física
if (permission === "granted") {
  new Notification("CRISPR-GATE: ALERTA MÉDICA", {
    body: "Sujeto sin esquema de vacunación detectado en Aduana.",
    icon: "/alert-icon.png" // Opcional
  });
}