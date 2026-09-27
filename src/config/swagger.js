const swaggerJsdoc = require("swagger-jsdoc");

const errorResponses = {
  400: { description: "Datos inválidos", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
  404: { description: "Recurso no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
  500: { description: "Error interno", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
};
const jsonBody = (schema) => ({ required: true, content: { "application/json": { schema } } });
const idParam = { name: "id", in: "path", required: true, schema: { type: "string" } };
const paginatedParams = [
  { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
  { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 10 } },
];

const definition = {
  openapi: "3.0.3",
  info: {
    title: "ShipNow API",
    version: "1.0.0",
    description: "API profesional para gestionar usuarios, pedidos, repartidores, entregas, archivos y datos de prueba.",
  },
  servers: [{ url: "http://localhost:8080", description: "Servidor local" }],
  tags: ["Users", "Orders", "Deliveries", "Mocks", "Logger", "Couriers", "Products", "Health"].map(name => ({ name })),
  components: {
    schemas: {
      FileMetadata: { type: "object", properties: { originalName:{type:"string"}, generatedName:{type:"string"}, path:{type:"string"}, mimeType:{type:"string"}, size:{type:"integer"}, documentType:{type:"string"}, uploadedAt:{type:"string",format:"date-time"} } },
      User: { type:"object", required:["first_name","last_name","email"], properties:{ _id:{type:"string"}, first_name:{type:"string"}, last_name:{type:"string"}, email:{type:"string",format:"email"}, role:{type:"string",enum:["admin","user","courier"]}, documents:{type:"array",items:{$ref:"#/components/schemas/FileMetadata"}} } },
      OrderItem: { type:"object", properties:{ name:{type:"string"}, quantity:{type:"number"}, price:{type:"number"} } },
      Order: { type:"object", required:["customerName","address","weight"], properties:{ _id:{type:"string"}, customerName:{type:"string"}, customer:{type:"string"}, address:{type:"string"}, weight:{type:"number"}, cost:{type:"number"}, status:{type:"string",enum:["pending","in_transit","delivered"]}, priority:{type:"string",enum:["normal","high"]}, items:{type:"array",items:{$ref:"#/components/schemas/OrderItem"}}, courierId:{type:"string"} } },
      Delivery: { type:"object", properties:{ _id:{type:"string"}, orderId:{type:"string"}, courierId:{type:"string"}, status:{type:"string",enum:["assigned","in_transit","delivered"]}, assignedAt:{type:"string",format:"date-time"}, proofs:{type:"array",items:{$ref:"#/components/schemas/FileMetadata"}} } },
      Courier: { type:"object", properties:{ _id:{type:"string"}, name:{type:"string"}, zone:{type:"string"}, available:{type:"boolean"} } },
      Product: { type:"object", required:["name","price"], properties:{ _id:{type:"string"}, name:{type:"string"}, price:{type:"number",minimum:0}, stock:{type:"integer",minimum:0}, status:{type:"string",enum:["available","out_of_stock"]} } },
      ErrorResponse: { type:"object",required:["status","message","code"],properties:{status:{type:"string",example:"error"},message:{type:"string"},code:{type:"string"}} },
      SuccessResponse: { type:"object",properties:{status:{type:"string",example:"success"},message:{type:"string"},payload:{type:"object"}} },
      Pagination: { type:"object",properties:{page:{type:"integer"},limit:{type:"integer"},total:{type:"integer"},totalPages:{type:"integer"}} },
    },
  },
  paths: {
    "/api/health": { get:{ tags:["Health"], summary:"Estado de la API", responses:{200:{description:"API disponible"}} } },
    "/api/users": {
      get:{tags:["Users"],summary:"Lista usuarios con paginación",parameters:[...paginatedParams,{name:"role",in:"query",schema:{type:"string"}}],responses:{200:{description:"Lista de usuarios"},...errorResponses}},
      post:{tags:["Users"],summary:"Crea un usuario",requestBody:jsonBody({$ref:"#/components/schemas/User"}),responses:{201:{description:"Usuario creado"},409:{description:"Email existente"},...errorResponses}},
    },
    "/api/users/{id}": { get:{tags:["Users"],summary:"Obtiene un usuario",parameters:[idParam],responses:{200:{description:"Usuario encontrado"},...errorResponses}} },
    "/api/users/{id}/documents": { post:{tags:["Users"],summary:"Carga un documento de usuario",parameters:[idParam],requestBody:{required:true,content:{"multipart/form-data":{schema:{type:"object",required:["document","documentType"],properties:{document:{type:"string",format:"binary"},documentType:{type:"string",enum:["identity","address","other"]}}}}}},responses:{201:{description:"Documento asociado"},...errorResponses}} },
    "/api/orders": {
      get:{tags:["Orders"],summary:"Lista pedidos con paginación y filtros",parameters:[...paginatedParams,{name:"status",in:"query",schema:{type:"string"}},{name:"priority",in:"query",schema:{type:"string"}}],responses:{200:{description:"Lista de pedidos"},...errorResponses}},
      post:{tags:["Orders"],summary:"Crea un pedido",requestBody:jsonBody({$ref:"#/components/schemas/Order"}),responses:{201:{description:"Pedido creado"},...errorResponses}},
    },
    "/api/orders/{id}": { get:{tags:["Orders"],summary:"Obtiene un pedido",parameters:[idParam],responses:{200:{description:"Pedido encontrado"},...errorResponses}},delete:{tags:["Orders"],summary:"Elimina un pedido",parameters:[idParam],responses:{200:{description:"Pedido eliminado"},...errorResponses}} },
    "/api/orders/{id}/status": { patch:{tags:["Orders"],summary:"Actualiza el estado de un pedido",parameters:[idParam],requestBody:jsonBody({type:"object",required:["status"],properties:{status:{type:"string",enum:["pending","in_transit","delivered"]}}}),responses:{200:{description:"Estado actualizado"},...errorResponses}} },
    "/api/couriers": { get:{tags:["Couriers"],summary:"Lista repartidores",responses:{200:{description:"Lista de repartidores"}}},post:{tags:["Couriers"],summary:"Crea un repartidor",requestBody:jsonBody({$ref:"#/components/schemas/Courier"}),responses:{201:{description:"Repartidor creado"},...errorResponses}} },
    "/api/couriers/{id}": { get:{tags:["Couriers"],summary:"Obtiene un repartidor",parameters:[idParam],responses:{200:{description:"Repartidor encontrado"},...errorResponses}} },
    "/api/products": { get:{tags:["Products"],summary:"Lista productos",responses:{200:{description:"Lista de productos"},...errorResponses}},post:{tags:["Products"],summary:"Crea un producto",requestBody:jsonBody({$ref:"#/components/schemas/Product"}),responses:{201:{description:"Producto creado"},...errorResponses}} },
    "/api/products/{id}": { get:{tags:["Products"],summary:"Obtiene un producto",parameters:[idParam],responses:{200:{description:"Producto encontrado"},...errorResponses}} },
    "/api/deliveries": {
      get:{tags:["Deliveries"],summary:"Lista entregas con paginación",parameters:[...paginatedParams,{name:"status",in:"query",schema:{type:"string"}}],responses:{200:{description:"Lista de entregas"},...errorResponses}},
      post:{tags:["Deliveries"],summary:"Crea una entrega",requestBody:jsonBody({type:"object",required:["orderId","courierId"],properties:{orderId:{type:"string"},courierId:{type:"string"},status:{type:"string"}}}),responses:{201:{description:"Entrega creada"},...errorResponses}},
    },
    "/api/deliveries/{id}": { get:{tags:["Deliveries"],summary:"Obtiene entrega y tracking",parameters:[idParam],responses:{200:{description:"Entrega encontrada"},...errorResponses}} },
    "/api/deliveries/{id}/status": { patch:{tags:["Deliveries"],summary:"Actualiza estado de entrega",parameters:[idParam],requestBody:jsonBody({type:"object",required:["status"],properties:{status:{type:"string",enum:["assigned","in_transit","delivered"]}}}),responses:{200:{description:"Estado actualizado"},...errorResponses}} },
    "/api/deliveries/{id}/proof": { post:{tags:["Deliveries"],summary:"Carga un comprobante de entrega",parameters:[idParam],requestBody:{required:true,content:{"multipart/form-data":{schema:{type:"object",required:["proof"],properties:{proof:{type:"string",format:"binary"}}}}}},responses:{201:{description:"Comprobante asociado"},...errorResponses}} },
    "/api/mocks/users": { get:{tags:["Mocks"],summary:"Genera usuarios mock",parameters:[{name:"quantity",in:"query",required:true,schema:{type:"integer",minimum:1}}],responses:{200:{description:"Mocks generados"},400:{description:"Cantidad inválida"}}} },
    "/api/mocks/orders": { get:{tags:["Mocks"],summary:"Genera pedidos mock",parameters:[{name:"quantity",in:"query",required:true,schema:{type:"integer",minimum:1}}],responses:{200:{description:"Mocks generados"},400:{description:"Cantidad inválida"}}} },
    "/api/mocks/deliveries": { get:{tags:["Mocks"],summary:"Genera entregas mock",parameters:[{name:"quantity",in:"query",required:true,schema:{type:"integer",minimum:1}}],responses:{200:{description:"Mocks generados"},400:{description:"Cantidad inválida"}}} },
    "/api/mocks/all": { get:{tags:["Mocks"],summary:"Genera todos los mocks",parameters:[{name:"quantity",in:"query",required:true,schema:{type:"integer",minimum:1}}],responses:{200:{description:"Mocks generados"},400:{description:"Cantidad inválida"}}} },
    "/api/mocks/seed": { post:{tags:["Mocks"],summary:"Inserta el set interno de datos de prueba; no requiere body",responses:{201:{description:"Datos insertados"},500:{description:"Error de base de datos"}}} },
    "/api/logger/test": { get:{tags:["Logger"],summary:"Herramienta interna para validar niveles de logs; no es una función de negocio",responses:{200:{description:"Logs generados"}}} },
  },
};

module.exports = swaggerJsdoc({ definition, apis: [] });
