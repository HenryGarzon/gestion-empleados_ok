# Requisitos Previos - Taller de Gestión de Empleados

## Herramientas Obligatorias

### 1. Node.js (18+)

```bash
# Verificar instalación
node --version
# Debe mostrar: 18.x.x o superior
```

**Descargar**: https://nodejs.org

---

### 2. Git

```bash
# Verificar instalación
git --version
```

**Descargar**: https://git-scm.com

---

### 3. Editor de Código

| Recomendado | Notas |
|------------|-------|
| **VS Code** | https://code.visualstudio.com |
| WebStorm | De pago |
| Sublime Text | Gratis |

**Extensiones recomendadas para Next.js:**
- ES7+ React snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens

---

## Herramientas de IA (Opcional)

### opencode (CLI para asistencia de IA)

```bash
# Instalar
npm install -g opencode

# Verificar
opencode --version
```

**Documentación**: https://opencode.ai

### Modelos LLM disponibles

| Modelo | Alias | Notas |
|--------|-------|-------|
| glm-4.5:cloud | "Big Pickle" | Modelo gratuito de OpenCode Zen |
| minimax-m2.7:cloud | - | Modelo en la nube |

#### Comandos para usar modelos

```bash
# Con Ollama - seleccionar modelo al lanzar
ollama launch opencode --config
# Luego seleccionar glm-4.5:cloud

# Establecer modelo por defecto
ollama launch opencode --set-default glm-4.5:cloud

# Descargar modelo (si se quiere usar offline)
ollama run glm-4.5:cloud
```

### Ollama (Gestor de modelos locales)

```bash
# Instalar (Windows/macOS/Linux)
# Descargar desde https://ollama.ai

# Verificar
ollama --version

# Descargar modelos locales (opcional)
ollama run llama2
ollama run codellama
```

---

## Cuentas Requeridas

| Servicio | Propósito | Costo |
|----------|----------|-------|
| **GitHub** | Repositorio de código | Gratis |
| **Supabase** | Base de datos + Auth | Tier gratis |
| **Vercel** | Despliegue (2 proyectos) | Plan gratis |

### Crear cuentas ANTES de comenzar:

1. **GitHub**: https://github.com/signup
2. **Supabase**: https://supabase.com
3. **Vercel**: https://vercel.com (continuar con GitHub)

---

## Desarrollo: Dos Terminales

```bash
# Terminal 1 - Backend (puerto 3001)
cd backend
npm run dev

# Terminal 2 - Frontend (puerto 3000)  
cd frontend
npm run dev
```

---

## Advertencias Importantes

### ⚠️ Windows

- Usar **PowerShell** o **Terminal de Windows** (no cmd.exe)
- Las rutas usan `\` pero en código convertir a `/`
- Comandos con `;` en vez de `&&`

### ⚠️ Variables de Entorno

- **NUNCA** commitear `.env.local`
- Siempre usar `.env.example` como plantilla
- Verificar `.gitignore` incluya `.env*`

### ⚠️ Conexión a Internet

- Supabase y Vercel requieren conexión
- El seed carga imágenes de ui-avatars.com
- Verificar internet antes de troubleshooting

### ⚠️ Puerto 3000

- Si está en uso:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <numero> /F
  ```

---

## Verificación Previa

Ejecutar estos comandos antes de empezar:

```bash
# 1. Node.js
node --version

# 2. npm
npm --version

# 3. Git
git --version

# 4. Carpeta de trabajo existe
ls C:\Users\User\Desktop\integrar
```

---

## Siguiente Paso

Una vez verificadas las herramientas, ir a **PASO 1** en `docs/SECUENCIA.md`