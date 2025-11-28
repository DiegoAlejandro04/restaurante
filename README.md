# Plataforma de Pedidos - Restaurante

Sistema completo de pedidos para restaurante con **Backend** y **Frontend** separados.

---

## Estructura del Proyecto

\`\`\`
/
├── backend/                 # API REST (Node.js + Express)
│   ├── src/
│   │   ├── routes/          # Rutas de la API
│   │   ├── db.js            # Conexión a base de datos
│   │   └── server.js        # Servidor Express
│   ├── package.json
│   └── .env.example
│
├── frontend/                # Aplicación Web (Next.js + React)
│   ├── app/                 # Páginas de la aplicación
│   ├── components/          # Componentes reutilizables
│   ├── lib/                 # Utilidades y tipos
│   ├── package.json
│   └── .env.example
│
└── scripts/                 # Scripts SQL para la base de datos
    ├── 001-create-tables.sql
    └── 002-seed-data.sql
\`\`\`

---

## Requisitos Previos

- **Node.js** v18 o superior
- **npm** o **yarn**
- **Base de datos PostgreSQL** (Neon, Supabase, o local)
- **VS Code** (recomendado)

---

## Paso 1: Configurar la Base de Datos

### Opción A: Usar Neon (Recomendado para producción)
1. Ve a [neon.tech](https://neon.tech) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Copia la URL de conexión (DATABASE_URL)

### Opción B: PostgreSQL Local
1. Instala PostgreSQL en tu computadora
2. Crea una base de datos: `createdb restaurante_db`

### Ejecutar Scripts SQL
Ejecuta los scripts en orden en tu cliente SQL:
\`\`\`bash
# En Neon: Usa el SQL Editor en el dashboard
# En local: usa psql
psql -d restaurante_db -f scripts/001-create-tables.sql
psql -d restaurante_db -f scripts/002-seed-data.sql
\`\`\`

---

## Paso 2: Configurar el Backend

### 2.1 Instalar dependencias
\`\`\`bash
cd backend
npm install
\`\`\`

### 2.2 Configurar variables de entorno
\`\`\`bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tu DATABASE_URL
# DATABASE_URL=postgresql://usuario:contraseña@host/basedatos
\`\`\`

### 2.3 Ejecutar en desarrollo
\`\`\`bash
npm run dev
\`\`\`

El backend estará disponible en: `http://localhost:3001`

### 2.4 Verificar que funciona
\`\`\`bash
# En otra terminal:
curl http://localhost:3001/api/health
# Debe responder: {"status":"ok","message":"API funcionando correctamente"}
\`\`\`

---

## Paso 3: Configurar el Frontend

### 3.1 Instalar dependencias
\`\`\`bash
cd frontend
npm install
\`\`\`

### 3.2 Configurar variables de entorno
\`\`\`bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# La URL del backend (desarrollo)
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

### 3.3 Ejecutar en desarrollo
\`\`\`bash
npm run dev
\`\`\`

El frontend estará disponible en: `http://localhost:3000`

---

## Paso 4: Desplegar en la Red

### Backend - Desplegar en Railway

1. Ve a [railway.app](https://railway.app) y crea cuenta con GitHub
2. Click en "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio y la carpeta `backend`
4. En Settings → Variables, agrega:
   - `DATABASE_URL` = tu URL de Neon
   - `PORT` = 3001
   - `FRONTEND_URL` = URL de tu frontend (después de desplegarlo)
5. Railway te dará una URL como: `https://tu-app.railway.app`

### Frontend - Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea cuenta con GitHub
2. Click en "Add New Project"
3. Importa tu repositorio
4. En "Root Directory" selecciona `frontend`
5. En "Environment Variables" agrega:
   - `NEXT_PUBLIC_API_URL` = `https://tu-backend.railway.app/api`
6. Click en "Deploy"
7. Vercel te dará una URL como: `https://tu-app.vercel.app`

### Actualizar CORS del Backend
Después de desplegar el frontend, actualiza la variable `FRONTEND_URL` en Railway con la URL de Vercel.

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/health | Estado de la API |
| GET | /api/categories | Listar categorías |
| GET | /api/products | Listar productos |
| GET | /api/products?category=1 | Productos por categoría |
| POST | /api/products | Crear producto |
| GET | /api/tables | Listar mesas |
| GET | /api/orders | Listar pedidos |
| POST | /api/orders | Crear pedido |
| PUT | /api/orders/:id | Actualizar pedido |

---

## Comandos Útiles

### Backend
\`\`\`bash
cd backend
npm run dev      # Desarrollo con hot-reload
npm start        # Producción
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm run dev      # Desarrollo
npm run build    # Construir para producción
npm start        # Ejecutar build de producción
\`\`\`

---

## Tecnologías Utilizadas

### Backend
- Node.js + Express.js
- PostgreSQL (Neon)
- CORS para comunicación cross-origin

### Frontend
- Next.js 14 (React)
- Tailwind CSS
- SWR para fetching de datos
- shadcn/ui para componentes

---

## Soporte

Si tienes problemas:
1. Verifica que las variables de entorno estén correctas
2. Revisa que la base de datos tenga las tablas creadas
3. Verifica que el backend esté corriendo antes que el frontend
