# Guía de Despliegue con Vercel (v1.6.0)

## IMPORTANTE: Dos Proyectos

Este proyecto usa **dos proyectos independientes** que deben desplegarse **por separado** en Vercel:

| Proyecto | Carpeta | Puerto | Tipo |
|----------|---------|--------|------|
| **Backend** | `backend/` | :3001 | API REST |
| **Frontend** | `frontend/` | :3000 | UI |

---

## Requisitos Previos
- Cuenta GitHub
- Proyecto Supabase configurado (con tabla empleados)
- Dos cuenta Vercel O dos proyectos en una cuenta

---

## Paso 1: Desplegar Backend

### 1.1: Importar Proyecto Backend

1. En Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Buscar el repositorio `gestion-empleados`
3. En **"Root Directory"**, escribir: `backend`
4. Click **"Import"**

### 1.2: Configurar Backend

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `backend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

### 1.3: Variables de Entorno (Backend)

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 1.4: Deploy Backend

1. Click **"Deploy"**
2. Esperar ~2-3 minutos
3. **URL generada**: `https://gestion-empleados-api.vercel.app`

---

## Paso 2: Desplegar Frontend

### 2.1: Importar Proyecto Frontend

1. En Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Buscar el repositorio `gestion-empleados`
3. En **"Root Directory"**, escribir: `frontend`
4. Click **"Import"**

### 2.2: Configurar Frontend

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

### 2.3: Variables de Entorno (Frontend)

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_URL=https://gestion-empleados-api.vercel.app
```

### 2.4: Deploy Frontend

1. Click **"Deploy"**
2. Esperar ~2-3 minutos
3. **URL generada**: `https://gestion-empleados.vercel.app`

---

## URLs del Proyecto (Producción)

| Proyecto | URL Producción |
|----------|----------------|
| Backend API | `https://gestion-empleados-api.vercel.app` |
| Frontend UI | `https://gestion-empleados.vercel.app` |

---

## Verificación Post-Deploy

### Checklist de verificación

- [ ] Frontend URL funciona
- [ ] Redirige a /login (no autenticado)
- [ ] Permite registro de usuario
- [ ] Permite login
- [ ] Muestra página de empleados (vacío al inicio)
- [ ] Permite crear empleado
- [ ] Empleado aparece en lista
- [ ] Permite editar empleado
- [ ] Permite eliminar empleado
- [ ] Cierra sesión correctamente

---

## Deploy Automático

Cada vez que hagas push a GitHub, Vercel hará deploy automáticamente.

**Importante**: Para el frontend, asegurate de que la variable `NEXT_PUBLIC_API_URL` apunte a la URL del backend en producción.

### Configuración
Una vez configurado Vercel:
- Cada push a `main` hace deploy automático
- No necesitas hacer nada extra

### Verificar que funciona
```
1. Hacer cambios en código local
2. git add .
3. git commit -m "nuevos cambios"
4. git push origin main
5. Ir a Vercel Dashboard
6. Ver que aparece nuevo deploy
```

---

## Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Build failed" | Verificar variables de entorno en Vercel |
| "502 Error" | Ver que la app compile localmente con npm run build |
| "Cannot read env" | Verificar NEXT_PUBLIC_ prefixes |
| "Table not found" | Verificar que tabla existe en Supabase |

---

## Siguiente Paso

Una vez desplegado, verificar funcionalidad:
- Probar registro/login
- Probar CRUD de empleados
