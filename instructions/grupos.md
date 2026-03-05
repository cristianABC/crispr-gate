# 🛰️ Tabla de Asignaciones: Operación CRISPR-GATE

Esta tabla detalla la distribución de sectores, el hardware requerido y el nivel de colaboración técnica necesaria para el éxito del despliegue.

| Grupo | Sector | Especialidad | Hardware / API | Nivel de Integración |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Sector 1: Registro Neón** | Acceso y Energía | **Battery API** | 🟢 Bajo |
| **2** | **Sector 2: Identidad Genética** | Bio-Escaneo | **MediaDevices (Cámara)** | 🟢 Bajo |
| **3** | **Sector 3: Bio-Seguridad** | Control de Patógenos | **Web Speech API** | 🟡 Medio |
| **4** | **Sector 4: Aduana Médica** | Inmunización | **Notifications API** | 🟡 Medio |
| **5** | **Sector 5: Logística Espacial** | Rastreo y Rutas | **Geolocation API** | 🟢 Bajo |
| **6** | **Sector 6: Biometría** | Archivo y Memoria | **LocalStorage API** | 🔴 **ALTO (🔗)** |
| **7** | **Sector 7: Auditoría de Implantes** | Control de Activos | **Clipboard API** | 🟡 Medio |
| **8** | **Sector 8: Vigilancia** | Radar de Reincidencia | **Web Speech API** | 🔴 **ALTO (🔗)** |

---

### ⚠️ Convenciones de Integración Crítica (🔴 ALTO)

Para los sectores marcados con el icono **(🔗)**, la funcionalidad final depende de una sincronización estricta entre las ramas de Git durante el proceso de **Merge**:

* **Sector 6 (Biometría):** La persistencia local es el puente. El Estudiante A (UI) debe preparar el panel de visualización, mientras que el Estudiante B (Hardware) debe asegurar que los clics en las tarjetas disparen el guardado.
* **Sector 8 (Vigilancia):** El hardware actúa como filtro. El Estudiante A mapea la lista total, pero el Estudiante B debe inyectar el resultado del reconocimiento de voz en el filtro dinámico del componente.

 **EN ESTOS DOS SECTORES LOS MIEMBROS QUE TRABAJARAN CARDS Y HARDWARE, PUEDEN ESTAR JUNTOS Y HABLAR**

### ⚠️ Peticiones
* Deben consumir las API tanto la GET de obtener recursos y la POST para creación de recurso, se revisará en la pestaña network que sean llamados
* Encuentran las API que necesitan en la carpeta api/<nombre | abreviación sector>

# ⏳ Cronograma de Operación: CRISPR-GATE

Tienes **65 minutos** para completar el desarrollo antes de la fase de extracción (Merge). Sigue las fases estrictamente para asegurar tu calificación.

---

### 🕒 Línea de Tiempo del Examen (80 min total)

| Fase | Duración | Actividad | Recursos Permitidos |
| :--- | :--- | :--- | :--- |
| **01. Manual** | **15 min** | Lógica de componentes y estados. | 🧠 Solo tu cerebro |
| **02. Doc** | **20 min** | Conexión de Hardware / APIs. | 🌐 DOCUMENTACION WEB |
| **03. Notas** | **15 min** | Ajustes con base en talleres. | 📂 Notas y Talleres |
| **04. IA** | **15 min** | Debugging y optimización final. | 🤖 IA (Gemini/GPT) |
| **05. Merge** | **15 min** | **Integración y PR .** | 🔗 Trabajo en Equipo |

### 🚀 Fase Final: Integración y Despliegue (01:05 - 01:20)
**Es hora de unir fuerzas.**
1. Realicen el **Merges** de sus ramas hacia para unificar toda la vista.
2. Resuelvan los conflictos de Git (si los hay).
3. Crear pull request a `master`
4. **Presentación:** Verificaremos que el proyecto del curso
