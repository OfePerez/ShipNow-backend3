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

###Mocking y carga de datos de prueba

El proyecto incluye un módulo de mocking bajo `/api/mocks`.

La carpeta `mocks/` se encuentra fuera de `src/` y contiene los datos simulados. La integración con la API respeta la arquitectura por capas: routes, controllers, services y repositories.

### Endpoints de mocks

#### Obtener usuarios simulados

GET `/api/mocks/users`

Devuelve usuarios simulados con roles válidos (`user`, `admin`, `courier`) sin guardarlos en MongoDB.

#### Obtener pedidos simulados

GET `/api/mocks/orders`

Devuelve pedidos simulados con estados y prioridades válidas sin guardarlos en MongoDB.

#### Obtener entregas simuladas

GET `/api/mocks/deliveries`

Devuelve entregas simuladas con estados válidos sin guardarlas en MongoDB.

#### Obtener todos los mocks

GET `/api/mocks/all`

Devuelve usuarios, pedidos y entregas simuladas en una sola respuesta.

#### Cargar datos de prueba en MongoDB

POST `/api/mocks/seed`

Inserta usuarios, pedidos y entregas de prueba en MongoDB. Los pedidos se asocian a usuarios y repartidores, y las entregas se asocian a pedidos y repartidores.

### Ejemplo de uso

```bash
GET http://localhost:8080/api/mocks/all
POST http://localhost:8080/api/mocks/seed