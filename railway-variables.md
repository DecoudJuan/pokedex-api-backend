# Variables de entorno para Railway

## Variables necesarias:

### DATABASE_URL
Railway te proporcionará automáticamente una URL de PostgreSQL cuando crees una base de datos.

### PORT
Railway asigna automáticamente el puerto, pero puedes usar:
```
PORT=3000
```

### NODE_ENV
```
NODE_ENV=production
```

## Pasos para configurar:

1. En Railway, ve a tu proyecto
2. Haz clic en "Variables"
3. Agrega las variables arriba mencionadas
4. Para DATABASE_URL, Railway te dará una automáticamente cuando agregues una base de datos PostgreSQL
