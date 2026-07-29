const { mockUsers, mockOrders, mockDeliveries}= require('../../mocks');
const mocksRespository = require('../repositories/mocks.repository');
const AppError= require("../errors/AppError");
const {ERROR, ERRORS}= require("../errors/errorDictionary");
const { validate } = require('../models/user');
const order = require('../models/order');



function validateQuantity(quantity){
    const parsedQuantity = Number(quantity);

    if(
        !Number.isInteger(parsedQuantity) ||
        parsedQuantity <= 0
    ) {
        throw new AppError(ERRORS.INVALID_MOCK_QUANTITY);
    }
    return parsedQuantity;
}


function getMockUsers(quantity){
    const validQuantity= validateQuantity(quantity);

    return mockUsers.slice(0, validQuantity);
}
function getMockOrders(quantity){
    const validQuantity= validateQuantity(quantity);

    return mockOrders.slice(0, validQuantity);
}
function getMockDeliveries(quantity){
    const validQuantity= validateQuantity(quantity);

    return mockDeliveries.slice(0, validQuantity);
}
function getAllMocks(quantity){
    const validQuantity= validateQuantity(quantity);

    return {
        users: mockUsers.slice(0, validQuantity),
        orders: mockOrders.slice(0, validQuantity),
        deliveries: mockDeliveries.slice(0, validQuantity)
    };
}

function validateMockUsers(users){
    const hasInvalidUser= users.some((user)=>{
        return(
            typeof user.first_name !== "string" ||
            user.first_name.trim()=== "" ||
            typeof user.last_name !== "string"  ||
            user.last_name.trim()==="" ||
            typeof user.email !== "string" ||
            user.email.trim() === "" ||
            typeof user.password !== "string" ||
            user.passwrod.trim()=== "" ||
            !["user", "admin", "courier"].includes(user.role)
        );
    });
    if (hasInvalidUser){
        throw new AppError(ERRORS.INVALID_MOCK_DATA);
    }
}
function validateMockOrders(orders){
    const hasInvalidOrder = orders.some((order)=>{
        return (
            typeof order.customerName !== "string" ||
            order.customerName.trim()=== ""||
            typeof order.address !== "string" ||
            order.address.trim()=== "" ||
            typeof order.weight !== "number" ||
            typeof order.cost !== "number" ||
            typeof order.status !== "string" ||
            typeof order.priority !== "string" ||
            !Array.isArray(order.items)
        );
    });
    if(hasInvalidOrder){
        throw new AppError(ERRORS.INVALID_MOCK_DATA);
    }
}

function validateMockDeliveries(deliveries){
    const hasInvalidDeliveries = deliveries.some((delivery)=>{
        return (
            typeof delivery.status !== "string"  ||
            delivery.status.trim() === "" ||
            !(delivery.assignedAt instanceof Date)
        );
    });
    if(hasInvalidDeliveries){
        throw new AppError(ERRORS.INVALID_MOCK_DATA);
    }
}



async function seedMocks(){
    validateMockUsers(mockUsers);
    validateMockOrders(mockOrders);
    validateMockDeliveries(mockDeliveries);

    try{

        const createdMocks = await mocksRespository.seedMocks({
        users: mockUsers,
        orders: mockOrders,
        deliveries: mockDeliveries,
    });

    return createdMocks;

    } catch(error){
        throw new AppError(ERRORS.MOCK_DATABASE_ERROR);
    }
    
}

module.exports={
    getMockUsers,
    getMockOrders,
    getMockDeliveries,
    getAllMocks,
    seedMocks,
};