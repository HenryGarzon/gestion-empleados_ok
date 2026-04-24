# Crear Cuenta en Supabase (PASO 0)

> **IMPORTANTE**: Este es el **PASO 0** de la SECUENCIA. Debes completar **antes** de escribir código.

## Requisitos Previos
- Cuenta de GitHub (gratis) - https://github.com
- Correo electrónico

---

## Paso 1: Acceder a Supabase

1. Abrir navegador
2. Ir a: **https://supabase.com**
3. Click en **"Start your project"** (esquina superior derecha)

---

## Paso 2: Registro con GitHub

1. Click **"Sign in with GitHub"**
2. Se abrirá ventana de GitHub
3. **Autorizar** la aplicación de Supabase
4. Otorgar acceso a repositorios (opcional, pero recomendado para CI/CD)

---

## Paso 3: Configurar Organización

1. Supabase pide crear/organizar proyecto
2. Click **"New organization"** (si es primera vez)
3. Completar:
   - **Organization name**: Tu nombre de usuario de GitHub o nombre personalizado
   - **Plan**: Seleccionar **Free** (gratis)
4. Click **"Create organization"**

---

## Paso 4: Crear Nuevo Proyecto

1. Dentro de la organización, click **"New Project"**
2. Completar formulario:

| Campo | Valor Recomendado |
|-------|-------------------|
| **Name** | `gestion-empleados` |
| **Database Password** | Generar contraseña segura (usar generador) |
| **Region** | Seleccionar la más cercana a tus usuarios |
| **Pricing Plan** | Free |

3. Click **"Create new project"**
4. **Esperar ~2 minutos** mientras se provee la infraestructura

---

## Paso 5: Obtener API Keys (Después de Crear Proyecto)

1. En el sidebar izquierdo, click **Settings** (⚙️)
2. Click **API** (submenú)
3. Verás dos secciones importantes:

### Configuration
```
Project URL: https://xxxxxxxxxxxx.supabase.co
```

### API Keys
```
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Copiar estos valores** (los necesitaremos después)

---

## Paso 6: Crear Tabla Empleados

1. En el sidebar, click **SQL Editor**
2. Click **"New query"**
3. Pegar este SQL:

```sql
-- ============================================
-- CREAR TABLA EMPLEADOS
-- ============================================

CREATE TABLE empleados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  cargo TEXT NOT NULL,
  departamento TEXT,
  email TEXT,
  telefono TEXT,
  fecha_ingreso DATE,
  usuario_id UUID NOT NULL,
  imagen_base64 TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_empleados_usuario_id ON empleados(usuario_id);
CREATE INDEX idx_empleados_nombre ON empleados(nombre);
CREATE INDEX idx_empleados_email ON empleados(email);

-- ============================================
-- ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_empleados_updated_at
  BEFORE UPDATE ON empleados
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HABILITAR SEGURIDAD A NIVEL DE FILA (RLS)
-- ============================================

ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREAR POLÍTICAS DE SEGURIDAD
-- ============================================

-- Política: Usuarios ven solo sus empleados
CREATE POLICY "Usuarios ven sus empleados" ON empleados
  FOR ALL USING (auth.uid() = usuario_id);
```

4. Click **"Run"** (▶️) o **Ctrl + Enter**

**Resultado esperado**: "Success: Query completed"

---

## Paso 7: Configurar Variables de Entorno

Con dos proyectos independientes, cada uno tiene su propio `.env.local`:

### Backend

1. En la carpeta `backend/`, crear archivo `.env.local`
2. Pegar contenido (reemplazar valores reales):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Frontend

1. En la carpeta `frontend/`, crear archivo `.env.local`
2. Pegar contenido (reemplazar valores reales):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> **Nota**: El frontend usa `NEXT_PUBLIC_API_URL` para indicar dónde está el backend.

---

## Verificación

Para verificar que todo está correcto:

1. Ir a **Table Editor** en Supabase Dashboard
2. Verificar que aparece tabla **empleados**
3. Verificar que hay candado 🔒 (indica RLS activo)

---

## Resumen de URLs Importantes

| Recurso | URL |
|---------|-----|
| Dashboard | https://supabase.com/dashboard |
| Documentación | https://supabase.com/docs |
| GitHub (supabase-js) | https://github.com/supabase/supabase-js |

---

## Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Project is still provisioning" | Esperar 2 minutos y actualizar |
| Error al ejecutar SQL | Verificar que no haya espacios extra |
| RLS no permite acceso | Verificar políticas creadas correctamente |

---

## Siguiente Paso

Una vez configurado Supabase, continuar con:
- **Paso 10**: Implementar autenticación (login, register)
