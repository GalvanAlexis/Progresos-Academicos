# ISS-186: View Transitions API en ServicesSection

### 🎯 Target Files Permitidos
Lista blanca estricta de archivos que el sub-agente tiene permiso de modificar o crear:
- [MODIFY] src/components/home/ServicesSection.tsx
- [MODIFY] src/app/globals.css

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido dejar `framer-motion` importado o en uso dentro de `ServicesSection.tsx`.
- Prohibido agregar dependencias externas para animación.
- Prohibido ejecutar animaciones basadas en estados reactivos por frame (`layoutId`).

### 🧪 Quality Gate Determinista
Comando exacto de terminal para auditar y verificar el éxito del contrato:
`npm run build`
