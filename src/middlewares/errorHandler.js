const logger = require("../config/logger");



function errorHandler(error,req,res,next){
    const statusCode= error.statusCode ||500;
    const message= statusCode >= 500 ? "Error interno del servidor" : error.message;
    const code= statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : error.code;


    if(statusCode>=500){
        logger.error(`Error inesperado en ${req.method} ${req.originalUrl}: ${error.message}`);
    } else{
        logger.warning(`Error esperado en ${req.method} ${req.originalUrl}: ${error.message}`);
    }
    return res.status(statusCode).json({
        status: "error",
        message,
        code
    })
}
module.exports= errorHandler;







