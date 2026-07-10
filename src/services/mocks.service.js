const { mockUsers, mockOrders, mockDeliveries}= require('../../mocks');
const mocksRespository = require('../repositories/mocks.repository');

function getMockUsers(){
    return mockUsers;
}
function getMockOrders(){
    return mockOrders;
}
function getMockDeliveries(){
    return mockDeliveries;
}
function getAllMocks(){
    return {
        users: mockUsers,
        orders: mockOrders,
        deliveries: mockDeliveries,
    };
}

async function seedMocks(){
    const createdMocks = await mocksRespository.seedMocks({
        users: mockUsers,
        orders: mockOrders,
        deliveries: mockDeliveries,
    });

    return createdMocks;
}

module.exports={
    getMockUsers,
    getMockOrders,
    getMockDeliveries,
    getAllMocks,
    seedMocks,
};