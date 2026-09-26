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
        statusCode: 400,
        code: "ORDER_NOT_FOUND",
    },

    INVALID_ORDER_ITEMS: {
        message: "los items del pedido deben enviarse con un arreglo",
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
}
module.exports={ERRORS};