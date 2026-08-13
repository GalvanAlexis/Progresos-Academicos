# ISS-184: Menú Hamburguesa Móvil Minimalista

## Descripción
Refactorizar la navegación móvil para proveer un menú hamburguesa profesional y minimalista. Se emplearán estándares web modernos (API Popover / Dialog) para evitar librerías pesadas y lograr un rendimiento óptimo. Se debe asegurar que la experiencia sea sobria, manteniendo la accesibilidad.

## 🎯 Target Files Permitidos
- [MODIFY] src/components/Navbar.tsx
- [MODIFY] src/components/Sidebar.tsx
- [MODIFY] src/components/home/HomeLayout.tsx

## 🚫 Acciones Prohibidas (Guardrails)
- Prohibido utilizar librerías de UI externas (como Headless UI, Radix o Material) para el menú. Usar exclusivamente la API nativa de Popover o HTML5 `<dialog>`.
- Prohibido agregar animaciones complejas (framer-motion o micro-interacciones premium) al menú móvil; el diseño debe mantenerse estrictamente minimalista y funcional.
- No alterar la barra lateral (Sidebar) en resoluciones de escritorio.

## 🧪 Quality Gate Determinista
`npm run build`
