# ShipNow

API de logística y envíos desarrollada con Node.js, Express, MongoDB y Mongoose.

El proyecto implementa una arquitectura por capas para separar responsabilidades entre la recepción de las solicitudes HTTP, la lógica de negocio y el acceso a la base de datos. Además, incorpora un sistema centralizado de manejo de errores mediante `AppError` y un middleware global.

---

## Arquitectura

El flujo principal de la aplicación es:

```text
Router → Controller → Service → Repository → Mongoose
                        │
                        ▼
                  AppError
                        │
                        ▼
                 errorHandler
```

### Responsabilidades

- **Router:** relaciona cada endpoint con su Controller.
- **Controller:** recibe la solicitud HTTP, delega la lógica al Service y deriva cualquier error al middleware mediante `next(error)`.
- **Service:** contiene las reglas de negocio y las validaciones. Interpreta los resultados del Repository y lanza `AppError` cuando corresponde.
- **Repository:** encapsula el acceso a MongoDB utilizando Mongoose.
- **Model:** define la estructura de los documentos almacenados en la base de datos.
- **errorHandler:** centraliza el manejo de errores y genera respuestas JSON consistentes para toda la API.

Esta separación facilita el mantenimiento, las pruebas y la escalabilidad del proyecto.

---

## Manejo de errores

La aplicación implementa un sistema centralizado de manejo de errores.

- Los errores de negocio se representan mediante `AppError`.
- Los Services lanzan `AppError` cuando una regla de negocio no se cumple.
- Los Controllers delegan los errores utilizando `next(error)`.
- El middleware `errorHandler` transforma cualquier error en una respuesta HTTP consistente.
- Los errores internos (`500`) muestran un mensaje genérico al cliente y registran el error en el servidor.

---

## Requisitos

- Node.js
- npm
- MongoDB local o MongoDB Atlas

---

## Configuración

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow
NODE_ENV=development
```

También puede utilizarse una URI de MongoDB Atlas.

La aplicación valida estas variables durante el arranque. Si falta alguna o contiene un valor inválido, el servidor no iniciará y mostrará un mensaje descriptivo.

El archivo `.env` está excluido del repositorio para evitar publicar información sensible.

---

## Ejecución

Modo producción:

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

---

## Endpoints principales

### Users

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/users` | Crear usuario |
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |

### Products

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/products` | Crear producto |
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |

---

## Constantes del dominio

Los valores utilizados por la aplicación se encuentran centralizados en `src/constants`.

### Roles de usuario

- `ADMIN`
- `USER`

### Estados de producto

- `AVAILABLE`
- `OUT_OF_STOCK`

Centralizar estas constantes evita el uso de cadenas de texto dispersas por el proyecto y facilita el mantenimiento.

---

## Mocking y datos de prueba

El proyecto incluye un módulo de mocking bajo `/api/mocks`.

Los datos simulados se almacenan fuera de `src/` y la integración con la API respeta la misma arquitectura por capas utilizada por el resto del proyecto.

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/mocks/users` | Devuelve usuarios simulados |
| GET | `/api/mocks/orders` | Devuelve pedidos simulados |
| GET | `/api/mocks/deliveries` | Devuelve entregas simuladas |
| GET | `/api/mocks/all` | Devuelve todos los datos simulados |
| POST | `/api/mocks/seed` | Inserta datos de prueba en MongoDB |

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Nodemon