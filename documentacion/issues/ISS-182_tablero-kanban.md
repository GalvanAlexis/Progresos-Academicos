# ISS-182: Tablero Kanban de Tareas

## Descripción
Construir una vista interactiva (`/admin/kanban`) para gestionar tareas. El tablero debe permitir crear tickets, asignarles prioridad y moverlos entre columnas (TODO, IN_PROGRESS, DONE) actualizando su estado en la base de datos de Supabase.

## 🎯 Target Files Permitidos
- [NEW] src/app/admin/kanban/page.tsx
- [NEW] src/components/admin/kanban/KanbanBoard.tsx
- [NEW] src/components/admin/kanban/KanbanColumn.tsx
- [NEW] src/components/admin/kanban/KanbanCard.tsx
- [NEW] src/lib/actions/kanban.ts (Server Actions)

## 🚫 Acciones Prohibidas (Guardrails)
- Prohibido realizar polling manual (setInterval) a la base de datos.
- Respetar la arquitectura de Server Actions para las mutaciones.

## 🧪 Quality Gate Determinista
`npm run build`
