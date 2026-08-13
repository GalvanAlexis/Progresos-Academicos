# ISS-190: Migrar AboutSection a View Transitions API

### 🎯 Target Files Permitidos
- [MODIFY] src/components/home/AboutSection.tsx

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido el uso de la librería `framer-motion` en este archivo. Debe usarse HTML nativo + View Transitions API.
- Prohibido mantener la "X" en los modales.

### 🧪 Quality Gate Determinista
`npm run build`
