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


    USER_NAME_REQUIRED:{
        message:"El nombre del usuario es obligatorio",
        statusCode:400,
        code:"USER_NAME_REQUIRED",
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
    }


}
module.exports={ERRORS};