const mockService= require('../services/mocks.service');

function getMockUsers(req,res, next){
    const {quantity}= req.query;
    try{
        const users= mockService.getMockUsers();

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
        const orders= mockService.getMockOrders();

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
        const deliveries= mockService.getMockDeliveries();

        res.json({
            status: 'success',
            payload: deliveries,
        })
    }catch(error){
        next(error);
    }
}
function getAllMocks(req,res){
    const mocks= mockService.getAllMocks();

    res.json({
        status:'success',
        payload: mocks,
    });
}
async function seedMocks(req,res, next) {
    try{
        const createdMocks = await mockService.seedMocks();

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