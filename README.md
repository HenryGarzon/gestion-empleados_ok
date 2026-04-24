# Gestión de Empleados

Repositorio que contiene dos proyectos Next.js independientes: **backend** (API) y **frontend** (interfaz de usuario).

## Estructura

```
gestion-empleados/
├── backend/     # Servidor API (Next.js)
├── frontend/    # Interfaz de usuario (Next.js)
└── README.md
```

## Requisitos previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta en Supabase (para las variables de entorno)

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd gestion-empleados
```

### 2. Configurar el Backend

```bash
cd backend
cp .env.example .env.local
```

Edita `backend/.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Configurar el Frontend

```bash
cd ../frontend
cp .env.example .env.local
```

Edita `frontend/.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Instalación de dependencias

Instala las dependencias en ambos proyectos:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Ejecución

### Modo desarrollo

Ejecuta ambos proyectos en terminales separadas:

```bash
# Terminal 1 - Backend (puerto 3001)
cd backend
npm run dev

# Terminal 2 - Frontend (puerto 3000)
cd frontend
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### Producción

```bash
# Build
npm run build

# Start
npm run start
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una vez |

## Tests

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## Tecnologías

- **Framework**: Next.js 16
- **Lenguaje**: TypeScript
- **Base de datos**: Supabase
- **Estilos**: Tailwind CSS
- **Testing**: Vitest
- **Auth**: @supabase/ssr

## Notas importantes

- Cada proyecto tiene sus propias dependencias y configuración
- Asegúrate de tener ambos proyectos corriendo para el funcionamiento completo
- Las variables de entorno `.env.local` no deben subirse al repositorio
- El frontend se comunica con el backend a través de `NEXT_PUBLIC_API_URL`
