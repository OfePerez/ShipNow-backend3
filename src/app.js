const express= require('express');
const ordersRouter = require("./routes/orders");
const usersRouter = require('./routes/users');
const couriersRouter= require('./routes/couriers');
const productsRouter= require('./routes/products');
const deliveriesRouter= require('./routes/deliveries');
const mocksRouter= require('./routes/mocks');
const errorHandler= require("./middlewares/errorHandler");

const app= express();

//Middleware para interpretar cuerpos JSON
app.use(express.json());

//Registramos cada router en su ruta base
app.use('/api/orders',ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/couriers', couriersRouter);
app.use('/api/products', productsRouter);
app.use('/api/deliveries', deliveriesRouter);
app.use("/api/mocks", mocksRouter);
app.use(errorHandler);


//Health check
app.get("/", (req,res)=>{
    res.send('ShipNow API v1 - corriendo');
});

module.exports= app;