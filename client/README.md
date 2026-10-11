# TP02 LyEP 2026 - Grupo 17

Trabajo Práctico Nº 2 — Legislación y Ejercicio Profesional  
Carrera Analista Programador Universitario — FI UNJu

## Estructura del proyecto

- `client/` — Frontend React + Vite (Panel de Control de Clientes)
- `server/` — Backend Node.js + Express

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

### Frontend

```bash
cd client
npm install
npm run dev 


```

### Backend

```bash
cd server
npm install
cp .env.example .env   # completar con los datos reales
npm run dev
```

El servidor queda en `http://localhost:3001` y el frontend en `http://localhost:5173`.

> `npm run seed` carga datos de prueba. Usar solo en una base vacía.

## Variables de entorno

| Carpeta | Variable | Descripción |
|---|---|---|
| `server` | `MONGO_URI` | Cadena de conexión a MongoDB Atlas |
| `server` | `PORT` | Puerto del servidor (por defecto 3001) |
| `server` | `CLIENT_URL` | URL del frontend permitida por CORS (por defecto `http://localhost:5173`) |
| `client` | `VITE_API_URL` | URL base de la API (por defecto `http://localhost:3001/api`) |

Los archivos `.env` no se suben al repositorio.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/clientes` | Lista los clientes activos |
| GET | `/api/clientes/:id` | Devuelve un cliente |
| POST | `/api/clientes` | Crea un cliente (la contraseña se guarda hasheada y nunca se devuelve) |
| DELETE | `/api/clientes/:id` | Baja lógica del cliente (`activo: false`) |

## Tests

Con el servidor corriendo (`npm run dev`), en otra terminal:

```bash
cd server
npm test
```

Ejecuta 6 pruebas de integración sobre la API de clientes.

## Deploy

- **Backend** (ej. Render): directorio raíz `server`, comando `npm start`, variables `MONGO_URI` y `CLIENT_URL` (URL del frontend publicado).
- **Frontend** (ej. Vercel): directorio raíz `client`, variable `VITE_API_URL` con la URL pública del backend terminada en `/api`.
- En MongoDB Atlas → Network Access, permitir el acceso desde el servidor de deploy.
