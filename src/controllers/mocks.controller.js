const mockService= require('../services/mocks.service');

function getMockUsers(req,res){
    const users= mockService.getMockUsers();

    res.json({
        status: 'success',
        payload: users,
    });
}

function getMockOrders(req,res){
    const orders= mockService.getMockOrders();

    res.json({
        status: 'success',
        payload: orders,
    });
}
function getMockDeliveries(req,res){
    const deliveries= mockService.getMockDeliveries();

    res.json({
        status: 'success',
        payload: deliveries,
    });
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
            status:'succes',
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