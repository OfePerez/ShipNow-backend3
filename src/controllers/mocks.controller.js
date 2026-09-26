const mockService= require('../services/mocks.service');
const logger = require("../config/logger");

function getMockUsers(req,res, next){
    const {quantity}= req.query;
    try{
        const users= mockService.getMockUsers(quantity);
        logger.info(`Se generaron ${users.length} usuarios mock`);
            res.json({
            status: 'success',
            payload: users,
            })
        } catch(error){
            next(error);
        }
}

function getMockOrders(req,res, next){
    const{quantity}=req.query;
    try{
        const orders= mockService.getMockOrders(quantity);
        logger.info(`Se generaron ${orders.length} pedidos mock`);
        res.json({
            status: 'success',
            payload: orders,
        })
    }catch(error){
        next(error);
    }
}
function getMockDeliveries(req,res, next){
    const {quantity}=req.query;
    try{
        const deliveries= mockService.getMockDeliveries(quantity);
        logger.info(`Se generaron ${deliveries.length} entregas mock`);
        res.json({
            status: 'success',
            payload: deliveries,
        })
    }catch(error){
        next(error);
    }
}
function getAllMocks(req,res, next){
    const {quantity}= req.query;

    try{
    const mocks= mockService.getAllMocks(quantity);

    logger.info(`Se generaron ${mocks.users.length} registros de cada tipo de mock`);
    res.json({
        status:'success',
        payload: mocks,
    });
    } catch(error){
        next(error);
    }
}
async function seedMocks(req,res, next) {
    try{
        const createdMocks = await mockService.seedMocks();
        logger.info(`Datos mock insertados correctamente en MongoDB`);

        res.status(201).json({
            status:'success',
            message: 'Datos de prueba insertados correctamente',
            payload: createdMocks,
        });
    }catch (error){
        next(error);
    }
    
}

module.exports={
    getAllMocks,
    getMockDeliveries,
    getMockOrders,
    getMockUsers,
    seedMocks,
};