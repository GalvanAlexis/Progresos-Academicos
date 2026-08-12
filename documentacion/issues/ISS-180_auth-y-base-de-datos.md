# ISS-180: Configuración Auth y Base de Datos (SaaS Admin)

## Descripción
Establecer las bases del sistema backend para el nuevo panel de administración. Esto implica crear las tablas principales en Supabase, configurar el cliente de SSR y proteger la ruta `/admin` mediante un Middleware.

## 🎯 Target Files Permitidos
- [NEW] supabase/migrations/00000000000001_admin_schema.sql
- [NEW] src/lib/supabase/server.ts
- [NEW] src/lib/supabase/client.ts
- [NEW] src/lib/supabase/middleware.ts
- [MODIFY] src/proxy.ts
- [NEW] src/app/login/page.tsx

## 🚫 Acciones Prohibidas (Guardrails)
- Prohibido instalar librerías adicionales que no sean `@supabase/supabase-js` o `@supabase/ssr`.
- Prohibido modificar el diseño actual de la página pública en este issue.
- Prohibido cambiar el nombre del middleware actual (`src/proxy.ts`), solo debe actualizarse su lógica para incluir la validación de sesión en `/admin`.

## 🧪 Quality Gate Determinista
`npm run build`
(El build debe ser exitoso demostrando que no hay errores de TypeScript en la configuración de Supabase y el middleware).
