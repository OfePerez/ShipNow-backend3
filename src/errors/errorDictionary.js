const ERRORS= {
    PRODUCT_NAME_REQUIRED:{
        message: "El nombre del producto es obligatorio",
        statusCode: 400,
        code: "PRODUCT_NAME_REQUIRED",
    },
    INVALID_PRODUCT_PRICE:{
        message:"El precio debe ser un número mayor o igual a 0",
        statusCode:400,
        code:"INVALID_PRODUCT_PRICE",
    },
    INVALID_PRODUCT_STOCK:{
        message:"El stock debe ser un número mayor o igual a 0",
        statusCode:400,
        code:"INVALID_PRODUCT_STOCK",
    },
    INVALID_PRODUCT_STATUS:{
        message: "El estado del producto no es válido",
        statusCode:400,
        code:"INVALID_PRODUCT_STATUS",
    },
    PRODUCT_NOT_FOUND:{
        message:"Producto no encontrado",
        statusCode:404,
        code:"PRODUCT_NOT_FOUND",
    },


    USER_FIRST_NAME_REQUIRED: {
        message: "El nombre del usuario es obligatorio",
        statusCode: 400,
        code: "USER_FIRST_NAME_REQUIRED",
    },
    USER_LAST_NAME_REQUIRED: {
        message: "El apellido del usuario es obligatorio",
        statusCode: 400,
        code: "USER_LAST_NAME_REQUIRED",
    },
    USER_EMAIL_REQUIRED:{
        message:"El email del usuario es obligatorio",
        statusCode:400,
        code:"USER_EMAIL_REQUIRED",
    },
    INVALID_EMAIL_FORMAT:{
        message:"El formato del email no es válido",
        statusCode:400,
        code:"INVALID_EMAIL_FORMAT",
    },
    INVALID_USER_ROLE:{
        message:"El rol del usuario no es válido",
        statusCode:400,
        code:"INVALID_USER_ROLE",
    },
    USER_EMAIL_ALREADY_EXISTS:{
        message:"Ya existe un usuario con ese email",
        statusCode:409,
        code:"USER_EMAIL_ALREADY_EXISTS",
    },
    USER_NOT_FOUND:{
        message:"Usuario no encontrado",
        statusCode:404,
        code:"USER_NOT_FOUND",
    },

    INVALID_MOCK_QUANTITY:{
        message:"La cantidad de mocks debe ser un número entero mayor a 0",
        statusCode:400,
        code:"INVALID_MOCK_QUANTITY"
    },
    MOCK_DATABASE_ERROR:{
        message:"Ocurrió un error al cargar los datos de prueba en la base de datos",
        statusCode:500,
        code:"MOCK_DATABASE_ERROR",
    },
    INVALID_MOCK_DATA:{
        message: "Los datos generados para los mocks no son válidos",
        statusCode: 400,
        code: "INVALID_MOCK_DATA",
    },

    ORDER_REQUIRED_FIELDS: {
        message: "El nombre del cliente, la dirección y el peso son obligatorios",
        statusCode: 400,
        code: "ORDER_REQUIRED_FIELDS",
    },
    INVALID_ORDER_WEIGHT: {
        message: "El peso debe ser un número mayor a 0",
        statusCode: 400,
        code: "INVALID_ORDER_WEIGHT",
    },
    ORDER_STATUS_REQUIRED: {
        message: "El estado del pedido es obligatorio",
        statusCode: 400,
        code: "ORDER_STATUS_REQUIRED",
    },
    INVALID_ORDER_STATUS: {
        message: "El estado del pedido no es válido",
        statusCode: 400,
        code: "INVALID_ORDER_STATUS",
    },
    INVALID_ORDER_PRIORITY: {
        message: "La prioridad del pedido no es válida",
        statusCode: 400,
        code: "INVALID_ORDER_PRIORITY",
    },
    ORDER_NOT_FOUND: {
        message: "Pedido no encontrado",
        statusCode: 404,
        code: "ORDER_NOT_FOUND",
    },

    INVALID_ORDER_ITEMS: {
        message: "Los items del pedido deben enviarse como un arreglo",
        statusCode: 400,
        code: "INVALID_ORDER_ITEMS",
    },

    INVALID_RESOURCE_ID: {
        message: "El identificador proporcionado no es válido",
        statusCode: 400,
        code: "INVALID_RESOURCE_ID",
    },

    INVALID_PAGINATION: {
        message: "Page y limit deben ser números enteros mayores a 0; limit no puede superar 100",
        statusCode: 400,
        code: "INVALID_PAGINATION",
    },
    COURIER_REQUIRED_FIELDS: {
        message: "El nombre y la zona del repartidor son obligatorios",
        statusCode: 400,
        code: "COURIER_REQUIRED_FIELDS",
    },

    COURIER_NOT_FOUND: {
        message: "Repartidor no encontrado",
        statusCode: 404,
        code: "COURIER_NOT_FOUND",
    },

    DELIVERY_REQUIRED_FIELDS: {
        message: "El pedido y el repartidor son obligatorios",
        statusCode: 400,
        code: "DELIVERY_REQUIRED_FIELDS",
    },

    DELIVERY_STATUS_REQUIRED: {
        message: "El estado de la entrega es obligatorio",
        statusCode: 400,
        code: "DELIVERY_STATUS_REQUIRED",
    },

    INVALID_DELIVERY_STATUS: {
        message: "El estado de la entrega no es válido",
        statusCode: 400,
        code: "INVALID_DELIVERY_STATUS",
    },

    DELIVERY_NOT_FOUND: {
        message: "Entrega no encontrada",
        statusCode: 404,
        code: "DELIVERY_NOT_FOUND",
    },

    FILE_REQUIRED: {
        message: "Debe adjuntar un archivo",
        statusCode: 400,
        code: "FILE_REQUIRED",
    },
    INVALID_FILE_TYPE: {
        message: "El tipo de archivo no está permitido",
        statusCode: 400,
        code: "INVALID_FILE_TYPE",
    },
    FILE_TOO_LARGE: {
        message: "El archivo supera el tamaño máximo permitido",
        statusCode: 400,
        code: "FILE_TOO_LARGE",
    },
    INVALID_FILE_FIELD: {
        message: "El nombre del campo de archivo no es válido",
        statusCode: 400,
        code: "INVALID_FILE_FIELD",
    },
    INVALID_DOCUMENT_TYPE: {
        message: "El tipo de documento no es válido",
        statusCode: 400,
        code: "INVALID_DOCUMENT_TYPE",
    },
    FILE_SAVE_ERROR: {
        message: "No se pudo asociar el archivo a la entidad",
        statusCode: 500,
        code: "FILE_SAVE_ERROR",
    },
}
module.exports={ERRORS};
