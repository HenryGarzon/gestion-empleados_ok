# Imágenes Seed - Gestión de Empleados

Este directorio está reservado para las imágenes de avatar usadas en los datos de prueba (seed).

## Imágenes Generadas

El endpoint `/api/seed` genera avatares dinámicamente usando **ui-avatars.com**:

- **50 imágenes** usadas por los empleados seed
- **15 imágenes** extras "disponibles" (marcadas como `used: false`)

## Formato de URLs

Las imágenes son URLs externas a ui-avatars.com:
```
https://ui-avatars.com/api/?name=JA&background=1abc9c&color=fff&size=128&bold=true
```

## Estructura de Datos

El endpoint retorna un array `seedImages` con:
```typescript
{
  url: string;       // URL del avatar
  used: boolean;     // true = asignado a empleado, false = disponible
  empleado?: string;  // Nombre del empleado (solo si used: true)
}
```

## Carpeta public/images/seed

Si deseas descargar las imágenes localmente:

```
public/images/seed/
├── used/           # 50 imágenes para empleados
└── unused/         # 15 imágenes disponibles
```

Para generar SVGs locales, puedes usar un script con `canvas` o `sharp`.

## Notas

- Las imágenes de ui-avatars.com son externas y requieren conexión a internet
- Para offline, descarga las imágenes y almacénalas en `public/images/seed/`
- El campo `imagen_url` en la BD almacena la URL o ruta local
