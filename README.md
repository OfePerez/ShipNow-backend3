# ShipNow

API de logística y envíos desarrollada con Node.js, Express, MongoDB y Mongoose.

Esta versión refactoriza las entidades Users y Products mediante una arquitectura de tres capas: Controller, Service y Repository.

## Arquitectura

El flujo de dependencias es:

```text
Router → Controller → Service → Repository → Mongoose
```

- Router: relaciona cada endpoint con un Controller.
- Controller: recibe `req` y `res` y devuelve la respuesta HTTP.
- Service: contiene las validaciones y reglas de negocio.
- Repository: encapsula el acceso a MongoDB mediante Mongoose.
- Model: define la estructura de cada documento.

Esta separación evita que los Controllers conozcan detalles de la base de datos y facilita las pruebas y el mantenimiento.

## Requisitos

- Node.js
- npm
- MongoDB local o MongoDB Atlas

## Configuración

1. Instalar las dependencias:

```bash
npm install
```

2. Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow
NODE_ENV=development
```

También se puede utilizar una URI de MongoDB Atlas.

La aplicación valida estas variables al arrancar. Si falta alguna, muestra un error descriptivo y no inicia el servidor.

El archivo `.env` está excluido del repositorio para evitar publicar credenciales.

## Ejecución

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:8080
```

## Endpoints principales

### Users

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/api/users` | Crear usuario |
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |

### Products

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/api/products` | Crear producto |
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Obtener producto por ID |

## Constantes del dominio

Los roles y estados no se escriben como strings dispersos. Se encuentran centralizados en `src/constants/index.js` mediante objetos inmutables:

- Roles: `ADMIN`, `USER`.
- Estados de producto: `AVAILABLE`, `OUT_OF_STOCK`.

## Decisiones de diseño
```