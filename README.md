# ShipNow

API backend de logística desarrollada con Node.js, Express, MongoDB y Mongoose. Incluye arquitectura por capas, errores centralizados, logging, Swagger, tests funcionales, carga de archivos y ejecución con Docker.

## Arquitectura

```text
Router → Controller → Service → Repository → Mongoose
                        │
                     AppError
                        │
                  errorHandler
```

Los routers solo definen rutas. Las validaciones y reglas de negocio viven en Services; los Repositories concentran el acceso a MongoDB.

## Instalación y configuración

Requisitos: Node.js 22 o superior, npm y MongoDB.

```bash
npm install
cp .env.example .env
npm run dev
```

Variables principales:

| Variable | Uso |
|---|---|
| `PORT` | Puerto HTTP |
| `MONGODB_URI` | Conexión principal a MongoDB |
| `MONGODB_URI_TEST` / `TEST_DB_NAME` | Base separada para tests |
| `NODE_ENV` | `development`, `test` o `production` |
| `LOG_LEVEL` | Nivel mínimo de Winston |
| `UPLOAD_DIR` | Carpeta de archivos |
| `UPLOAD_MAX_SIZE_MB` | Tamaño máximo por archivo |
| `INTERNAL_ENDPOINTS_ENABLED` | Habilita mocks y logger test |
| `SWAGGER_ENABLED` | Habilita la documentación |

La aplicación falla al iniciar si faltan `PORT`, `MONGODB_URI` o `NODE_ENV`. No deben subirse archivos `.env`, logs, uploads, coverage ni `node_modules`.

## Ejecución

```bash
npm run dev
npm start
npm test
```

Los tests usan Mocha, Chai y Supertest y fuerzan la base `shipnow_test`; esa base se limpia antes y después de la suite.

## Swagger y health check

- Swagger UI: http://localhost:8080/api/docs
- Especificación JSON: http://localhost:8080/api/docs.json
- Health check: http://localhost:8080/api/health

Swagger organiza la API por Users, Orders, Deliveries, Mocks, Logger, Couriers, Products y Health. Incluye schemas reutilizables, parámetros, bodies, respuestas y errores.

## Endpoints principales

| Módulo | Endpoints |
|---|---|
| Users | `POST /api/users`, `GET /api/users`, `GET /api/users/:id` |
| Documentos | `POST /api/users/:id/documents` |
| Orders | `POST/GET /api/orders`, `GET/DELETE /api/orders/:id`, `PATCH /api/orders/:id/status` |
| Couriers | `POST/GET /api/couriers`, `GET /api/couriers/:id` |
| Products | `POST/GET /api/products`, `GET /api/products/:id` |
| Deliveries | `POST/GET /api/deliveries`, `GET /api/deliveries/:id`, `PATCH /api/deliveries/:id/status` |
| Comprobantes | `POST /api/deliveries/:id/proof` |
| Mocks | `GET /api/mocks/{users,orders,deliveries,all}`, `POST /api/mocks/seed` |
| Logger | `GET /api/logger/test` |

Los listados de usuarios, pedidos y entregas aceptan `page` y `limit` (máximo 100), además de filtros propios.

### Archivos

Los documentos usan `multipart/form-data`, campo de archivo `document` y `documentType` con valores `identity`, `address` u `other`. Los comprobantes usan el campo `proof`. Se aceptan PDF, JPEG y PNG hasta el límite configurado. MongoDB guarda solo metadatos; los binarios quedan en `uploads/`, excluida de Git.

## Errores y logging

Los errores responden siempre:

```json
{ "status": "error", "message": "Descripción", "code": "ERROR_CODE" }
```

Winston genera logs rotativos diarios `combined-AAAA-MM-DD.log` y `error-AAAA-MM-DD.log`, con máximo de 10 MB y retención de 14 días. La consola se usa únicamente en desarrollo.

En producción, mocks y logger test quedan deshabilitados por defecto mediante `INTERNAL_ENDPOINTS_ENABLED=false`. Swagger se mantiene disponible para revisión y puede deshabilitarse por entorno.

## Docker

Construcción y ejecución individual:

```bash
docker build -t shipnow-api .
docker run --env-file .env -p 8080:8080 shipnow-api
```

API y MongoDB juntos:

```bash
docker compose up --build
docker compose down
```

Compose espera el health check de MongoDB antes de iniciar la API y conserva la base, los logs y uploads en volúmenes. Una vez levantado, probar `/api/health`, `/api/docs` y cualquier endpoint principal en el puerto 8080.
