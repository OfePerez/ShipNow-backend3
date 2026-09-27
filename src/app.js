const express= require('express');
const ordersRouter = require("./routes/orders");
const usersRouter = require('./routes/users');
const couriersRouter= require('./routes/couriers');
const productsRouter= require('./routes/products');
const deliveriesRouter= require('./routes/deliveries');
const mocksRouter= require('./routes/mocks');
const errorHandler= require("./middlewares/errorHandler");
const loggerRouter = require("./routes/logger");
const logger = require("./config/logger");
const config = require("./config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const healthRouter = require("./routes/health");

const app= express();

//Middleware para interpretar cuerpos JSON
app.use(express.json({ limit: "1mb" }));
app.use((req,res,next)=>{
    logger.http(`${req.method} ${req.originalUrl}`);
    next();
});

//Registramos cada router en su ruta base
app.use("/api/health", healthRouter);
if (config.SWAGGER_ENABLED) {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));
}
app.use('/api/orders',ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/couriers', couriersRouter);
app.use('/api/products', productsRouter);
app.use('/api/deliveries', deliveriesRouter);
if (config.INTERNAL_ENDPOINTS_ENABLED) {
    app.use("/api/mocks", mocksRouter);
    app.use('/api/logger', loggerRouter);
}
//Health check
app.get("/", (req,res)=>{
    res.json({ status: "success", message: "ShipNow API v1 - corriendo", docs: "/api/docs" });
});
app.use((req,res)=>{
    logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);

    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada",
        code: "ROUTE_NOT_FOUND",
    });
});
app.use(errorHandler);




module.exports= app;
