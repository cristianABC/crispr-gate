# 💾 Sector 6: Biometría y Archivo - Persistencia Local

**Misión:** Gestionar el repositorio de respaldo de la terminal. Tu misión es asegurar que los perfiles biométricos permanezcan accesibles incluso si el nexo central de **CRISPR-GATE** pierde conexión, utilizando el almacenamiento físico de la terminal.

---

### 1. Visualización (Listar)
* **Mapeo:** Renderizar los 10 registros de `archivosBiometricos` en un panel de archivos digitales.
* **Lógica de Estilo (Condicionales de Perfil):**
    * Si **eyeColor es 'Cybernetic'**: Mostrar un badge de "AUMENTO ILEGAL" en color rojo neón.
    * Si **isArchived es true**: La tarjeta debe tener una opacidad del 60% y una etiqueta de "EN ARCHIVO".
    * Si **riskLevel es 'CRITICAL'**: El nombre del sujeto debe aparecer en **mayúsculas y negrita**.

### 2. Digitalización de Sujetos (Crear)
Implementar un formulario para registrar un nuevo perfil biométrico. Debe incluir **Feedback de Usuario**:
* **Estado de Carga:** Al registrar, mostrar el mensaje "Escribiendo en Memoria Sólida..." y deshabilitar el botón durante **1.5 segundos**.
* **Validación:** * Si la altura (`height`) es menor a 50 o mayor a 300, mostrar error en rojo: "VALOR BIOMÉTRICO FUERA DE RANGO".
    * **Bloqueo:** El botón de "Digitalizar" debe estar `disabled` si el campo `fingerprintHash` está vacío.
* **Éxito:** Al finalizar, mostrar un **Toast** o mensaje en verde: *"REGISTRO PERSISTIDO"* y limpiar el formulario.

### 3. Hardware: Memoria Sólida (LocalStorage API)
Usa el almacenamiento local para que la terminal "recuerde" al último sujeto consultado incluso después de refrescar la página.
* **Reglas de UI:**
    * 💾 **Guardado:** Al hacer clic en una tarjeta, guardar el nombre del sujeto en `localStorage`.
    * 🔄 **Recuperación:** En la parte superior de la sección, mostrar: "Último sujeto escaneado: [NOMBRE]".
    * 🧹 **Limpieza:** Un botón "Limpiar Caché" que borre los datos del `localStorage` y actualice la UI.



#### 💡 Pista Técnica:
```typescript
// Guardar dato (Stringify si es un objeto)
localStorage.setItem("ultimo_escaneo", nombreSujeto);

// Recuperar dato
const guardado = localStorage.getItem("ultimo_escaneo");

// Borrar dato
localStorage.removeItem("ultimo_escaneo");