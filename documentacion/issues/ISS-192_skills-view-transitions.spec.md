# ISS-192: Migrar SkillsSection a View Transitions API

### 🎯 Target Files Permitidos
- [MODIFY] src/components/home/SkillsSection.tsx

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido el uso de la librería `framer-motion` en este archivo. Debe usarse HTML nativo + View Transitions API.
- Prohibido dejar modales con la cruz X, el cierre debe ser por on-click.

### 🧪 Quality Gate Determinista
`npm run build`
