# ISS-189: Multi-Layout en Home (Carrusel, Masonry, Acordeón Exclusivo)

### 🎯 Target Files Permitidos
- [MODIFY] src/components/home/ServicesSection.tsx
- [MODIFY] src/components/home/SkillsSection.tsx
- [MODIFY] src/components/home/FAQSection.tsx

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido dejar modales gigantes sin scroll interno.
- Prohibido usar botones con una cruz "X" en los modales; el cierre debe ser por clic global.
- En el FAQ, prohibido dejar el comportamiento estándar de `<details>` (múltiples abiertos); debe ser controlado (solo uno a la vez).

### 🧪 Quality Gate Determinista
`npm run build`
