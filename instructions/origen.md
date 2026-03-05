# 🚀 Sector 5: Logística Espacial - Rastreo y Rutas

**Misión:** Gestionar el tráfico de naves y la procedencia geográfica de los viajeros. Tu terminal debe validar que las coordenadas de origen sean legítimas y asegurar que el equipo de control esté operando dentro del perímetro de seguridad de la aduana.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `registrosLogistica` en una tabla de navegación.
* **Lógica de Estilo (Condicionales de Trayecto):**
    * Si **distanceLightYears > 5**: Mostrar un icono de "VIAJE LARGO" y fondo de tarjeta `bg-slate-900`.
    * Si **originPlanet es 'Desconocido'**: El texto del planeta debe aparecer en **amarillo neón** con un signo de interrogación.
    * Si **riskLevel es 'CRITICAL'**: El modelo de la nave (`shipModel`) debe aparecer en rojo con una etiqueta de "INSPECCIÓN REQUERIDA".

### 2. Asignación de Rutas (Crear)
Implementar un formulario para definir un nuevo vector de salto (ruta). Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al confirmar la ruta, mostrar "Calculando Vector de Salto..." y deshabilitar el botón durante **1.5 segundos**.
* **Validación:** * Si la distancia en años luz es **menor o igual a 0**, mostrar error en rojo: "DISTANCIA NULA DETECTADA".
    * **Bloqueo:** El botón de "Asignar" debe estar `disabled` si el campo de coordenadas no sigue el formato numérico.
* **Éxito:** Al finalizar, mostrar un **Toast** o mensaje en verde: *"PLAN DE VUELO AUTORIZADO"* y limpiar el formulario.

### 3. Hardware: Localización de Estación (Geolocation API)
Usa el GPS del dispositivo para verificar que la terminal de control no haya sido desplazada de su zona asignada.
* **Reglas de UI:**
    * 📍 **Ubicación Obtenida:** Mostrar la Latitud y Longitud en un panel con borde azul cian.
    * ⚪ **Buscando:** Mientras obtiene la señal, mostrar un texto parpadeante: "SINCRONIZANDO CON SATÉLITE...".
    * ⚠️ **Sin Señal:** Si el acceso es denegado o falla, mostrar "ERROR: GPS BLOQUEADO" en fondo rojo.



#### 💡 Pista Técnica (Uso de callback):
```typescript
// Inicialización
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log(`LAT: ${latitude}, LNG: ${longitude}`);
  },
  (error) => {
    console.error("ERROR DE SEÑAL", error);
  }
);