# ISS-193: Purga Total de Framer Motion

### 🎯 Target Files Permitidos
- [MODIFY] package.json
- [MODIFY] src/components/home/HeroSection.tsx
- [MODIFY] src/app/ejemplos/landing/components/*.tsx
- [MODIFY] src/app/ejemplos/contable/components/*.tsx

### 🚫 Acciones Prohibidas (Guardrails)
- Prohibido mantener la dependencia `framer-motion` en `package.json`. Debe ser removida con `npm uninstall framer-motion`.
- Prohibido dejar cualquier etiqueta `<motion.div>`, `<AnimatePresence>` o import en todo el proyecto.
- No alterar la lógica de negocio ni el routing de las demos. Solo transformar las etiquetas visuales a HTML estándar.

### 🧪 Quality Gate Determinista
`npm run build`
(Si hay un error por import no resuelto de framer-motion, el test fallará y deberá iterarse).
