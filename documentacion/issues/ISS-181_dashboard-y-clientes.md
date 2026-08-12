# ISS-181: Layout del Dashboard y Gestión de Clientes

## Descripción
Crear el cascarón de la interfaz del panel de administración (`/admin/layout.tsx`) con una barra lateral (Sidebar) de navegación. Además, implementar la primera sección funcional: un CRUD (Crear, Leer, Actualizar, Eliminar) para administrar Clientes.

## 🎯 Target Files Permitidos
- [NEW] src/app/admin/layout.tsx
- [NEW] src/components/admin/AdminSidebar.tsx
- [NEW] src/app/admin/page.tsx (Métricas Mock)
- [NEW] src/app/admin/clientes/page.tsx
- [NEW] src/components/admin/clientes/ClientsTable.tsx
- [NEW] src/lib/actions/clients.ts (Server Actions)

## 🚫 Acciones Prohibidas (Guardrails)
- Prohibido usar estilos CSS globales, usar Tailwind CSS.
- Prohibido conectar el CRUD directamente desde el cliente sin usar Server Actions por razones de seguridad.

## 🧪 Quality Gate Determinista
`npm run build`
