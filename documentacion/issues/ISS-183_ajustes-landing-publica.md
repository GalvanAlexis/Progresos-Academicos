# ISS-183: Ajustes dinámicos de Landing Pública

## Descripción
Permitir que la landing page pública (Home) sea administrable. Se creará una vista en el panel (`/admin/settings`) con un formulario para modificar los textos de la cabecera (Hero). La página de inicio (`/page.tsx`) se refactorizará para consumir los datos desde Supabase (tabla `landing_settings`) en lugar de usar variables estáticas.

## 🎯 Target Files Permitidos
- [NEW] src/app/admin/settings/page.tsx
- [NEW] src/components/admin/settings/SettingsForm.tsx
- [NEW] src/lib/actions/settings.ts
- [MODIFY] src/app/page.tsx
- [MODIFY] src/components/home/HomeLayout.tsx (Remover el dashboard falso)

## 🚫 Acciones Prohibidas (Guardrails)
- Prohibido volver la página principal (`/page.tsx`) un Client Component (`'use client'`). La lectura de Supabase debe ocurrir del lado del servidor para SEO y performance.
- Eliminar por completo los rastros del dashboard falso estático (useAdmin.ts).

## 🧪 Quality Gate Determinista
`npm run build`
