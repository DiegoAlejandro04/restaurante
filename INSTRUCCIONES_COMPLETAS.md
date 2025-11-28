# Instrucciones Completas para Ejecutar y Desplegar

## Estructura del Proyecto

\`\`\`
restaurante-pedidos/
├── backend/           ← API REST (Express.js) - Se sube a Railway/Render
├── frontend/          ← Aplicación Web (Next.js) - Se sube a Vercel
├── scripts/           ← Scripts SQL para base de datos
├── README.md          ← Instrucciones generales
└── INSTRUCCIONES.md   ← Este archivo
\`\`\`

---

## PARTE 1: Configuración en VS Code (Desarrollo Local)

### Paso 1: Descargar el proyecto

1. Descarga el ZIP desde v0
2. Extrae el contenido en una carpeta
3. Abre VS Code y selecciona "Archivo" → "Abrir carpeta" → selecciona la carpeta extraída

### Paso 2: Configurar la Base de Datos (Neon)

1. Ve a https://neon.tech y crea una cuenta gratuita
2. Crea un nuevo proyecto llamado "restaurante"
3. En el dashboard, copia la cadena de conexión (DATABASE_URL)
4. Abre la consola SQL de Neon
5. Copia el contenido de `scripts/001-create-tables.sql` y ejecútalo
6. Copia el contenido de `scripts/002-seed-data.sql` y ejecútalo

### Paso 3: Configurar el Backend

Abre una terminal en VS Code (Terminal → Nueva Terminal):

\`\`\`bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env
\`\`\`

Edita el archivo `backend/.env`:
\`\`\`
DATABASE_URL=postgresql://tu_usuario:tu_password@tu_host/tu_database?sslmode=require
PORT=3001
FRONTEND_URL=http://localhost:3000
\`\`\`

Inicia el backend:
\`\`\`bash
npm run dev
\`\`\`

Deberías ver:
\`\`\`
╔════════════════════════════════════════════╗
║   🍽️  API Restaurante funcionando          ║
║   Puerto: 3001                             ║
║   URL: http://localhost:3001               ║
╚════════════════════════════════════════════╝
\`\`\`

### Paso 4: Configurar el Frontend

Abre OTRA terminal en VS Code (clic en el "+" en la terminal):

\`\`\`bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env.local
\`\`\`

Edita el archivo `frontend/.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

Inicia el frontend:
\`\`\`bash
npm run dev
\`\`\`

### Paso 5: Probar la aplicación

1. Abre http://localhost:3000 en tu navegador
2. Navega por el menú, agrega productos al carrito
3. Haz un pedido de prueba
4. Ve a http://localhost:3000/admin para gestionar pedidos

---

## PARTE 2: Subir a Internet (Despliegue)

### Requisitos previos
- Cuenta en GitHub (https://github.com)
- Cuenta en Railway (https://railway.app) - para el backend
- Cuenta en Vercel (https://vercel.com) - para el frontend

### Paso 1: Subir el código a GitHub

1. Crea un nuevo repositorio en GitHub llamado "restaurante-pedidos"
2. En VS Code, abre la terminal y ejecuta:

\`\`\`bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "Proyecto inicial - Plataforma de pedidos"

# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/restaurante-pedidos.git

# Subir el código
git branch -M main
git push -u origin main
\`\`\`

### Paso 2: Desplegar el Backend en Railway

1. Ve a https://railway.app
2. Inicia sesión con tu cuenta de GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Autoriza Railway para acceder a tus repositorios
6. Selecciona el repositorio "restaurante-pedidos"
7. **MUY IMPORTANTE**: En la configuración del servicio:
   - Click en "Settings"
   - En "Root Directory" escribe: `backend`
   - En "Start Command" escribe: `npm start`
8. Ve a la pestaña "Variables" y agrega:
   - `DATABASE_URL` = (pega tu cadena de conexión de Neon)
   - `PORT` = `3001`
   - `FRONTEND_URL` = (lo agregarás después de desplegar el frontend)
9. Railway automáticamente desplegará tu backend
10. En "Settings" → "Domains", genera un dominio público
11. Anota la URL, será algo como: `https://restaurante-backend-production.up.railway.app`

### Paso 3: Desplegar el Frontend en Vercel

1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta de GitHub
3. Click en "Add New..." → "Project"
4. Selecciona el repositorio "restaurante-pedidos"
5. **MUY IMPORTANTE**: En la configuración:
   - En "Root Directory" escribe: `frontend`
   - En "Framework Preset" selecciona: `Next.js`
6. En "Environment Variables" agrega:
   - `NEXT_PUBLIC_API_URL` = `https://tu-backend-railway.up.railway.app/api`
   (reemplaza con la URL real de Railway)
7. Click en "Deploy"
8. Espera a que termine el despliegue
9. Vercel te dará una URL como: `https://restaurante-frontend.vercel.app`

### Paso 4: Actualizar CORS en Railway

1. Vuelve a Railway
2. Ve a tu proyecto → Variables
3. Edita `FRONTEND_URL` con la URL de Vercel (sin "/" al final)
4. Railway automáticamente redesplegará el backend

---

## PARTE 3: Verificación Final

### Checklist de verificación:

- [ ] La base de datos tiene las tablas creadas (categories, products, tables, orders, order_items)
- [ ] La base de datos tiene los datos de ejemplo (20 productos, 10 mesas)
- [ ] El backend responde en `/api/health`
- [ ] El frontend carga la página principal
- [ ] El menú muestra los productos de la base de datos
- [ ] Se puede agregar productos al carrito
- [ ] Se puede crear un pedido
- [ ] El panel de admin muestra los pedidos

### URLs de prueba (reemplaza con tus URLs reales):

| Servicio | URL Local | URL Producción |
|----------|-----------|----------------|
| Frontend | http://localhost:3000 | https://tu-app.vercel.app |
| Backend API | http://localhost:3001/api | https://tu-backend.railway.app/api |
| Health Check | http://localhost:3001/api/health | https://tu-backend.railway.app/api/health |

---

## Solución de Problemas Comunes

### Error: "Failed to fetch" en el frontend
- Verifica que `NEXT_PUBLIC_API_URL` sea correcto
- Verifica que el backend esté corriendo
- Verifica que CORS esté configurado correctamente

### Error: "Connection refused" en el backend
- Verifica que `DATABASE_URL` sea correcta
- Verifica que incluya `?sslmode=require`

### Error: "CORS policy" en el navegador
- Verifica que `FRONTEND_URL` en el backend sea exactamente igual a la URL del frontend
- No incluyas "/" al final de las URLs

### Los productos no aparecen
- Verifica que ejecutaste los scripts SQL
- Prueba el endpoint directamente: `https://tu-backend/api/products`

---

## Comandos Útiles

\`\`\`bash
# Backend
cd backend
npm install      # Instalar dependencias
npm run dev      # Iniciar en modo desarrollo
npm start        # Iniciar en modo producción

# Frontend
cd frontend
npm install      # Instalar dependencias
npm run dev      # Iniciar en modo desarrollo
npm run build    # Construir para producción
npm start        # Iniciar versión de producción
