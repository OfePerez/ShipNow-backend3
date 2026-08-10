const { mockUsers, mockOrders, mockDeliveries}= require('../../mocks');
const mocksRespository = require('../repositories/mocks.repository');
const {AppError}= require("../errors/AppError");
const { USER_ROLES, ORDER_STATUS, ORDER_PRIORITY, DELIVERY_STATUS } = require('../constants');
const {ERRORS} = require("../errors/errorDictionary");



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
    const validRoles= Object.values(USER_ROLES);

    const hasInvalidUser= users.some((user)=>{
        const hasInvalidRole= user.role !== undefined &&
        (typeof user.role !== "string" || !validRoles.includes(user.role));

        return(
            typeof user.first_name !== "string" ||
            user.first_name.trim()=== "" ||
            typeof user.last_name !== "string"  ||
            user.last_name.trim()==="" ||
            typeof user.email !== "string" ||
            user.email.trim() === "" ||
            hasInvalidRole
        );
    });
    if (hasInvalidUser){
        throw new AppError(ERRORS.INVALID_MOCK_DATA);
    }
}
function validateMockOrders(orders){
    const validStatuses= Object.values(ORDER_STATUS);
    const validPriorities= Object.values(ORDER_PRIORITY);

    const hasInvalidOrder = orders.some((order)=>{
        const hasInvalidCost= order.cost !== undefined &&
        (typeof order.cost !== "number" ||
            !Number.isFinite(order.cost)
        );
        const hasInvalidStatus= order.status !== undefined && 
        ( typeof order.status !== "string" ||
            !validStatuses.includes(order.status)
        );
        const hasInvalidPriority= order.priority !== undefined &&
        ( typeof order.priority !== "string" ||
            !validPriorities.includes(order.priority)
        );
        const hasInvalidItems =
            order.items !== undefined &&
            (
                !Array.isArray(order.items) ||
                order.items.some((item) =>
                    typeof item !== "object" ||
                    item === null ||
                    Array.isArray(item) ||
                    (
                        item.name !== undefined &&
                        typeof item.name !== "string"
                    ) ||
                    (
                        item.quantity !== undefined &&
                    (
                        typeof item.quantity !== "number" ||
                        !Number.isFinite(item.quantity)
                    )
                ) ||
                (
                    item.price !== undefined &&
                (
                    typeof item.price !== "number" ||
                    !Number.isFinite(item.price)
                )
            )
        )
    );

        return (
            typeof order.customerName !== "string" ||
            order.customerName.trim()=== ""||
            typeof order.address !== "string" ||
            order.address.trim()=== "" ||
            typeof order.weight !== "number" ||
            !Number.isFinite(order.weight) ||
            hasInvalidCost ||
            hasInvalidStatus ||
            hasInvalidPriority ||
            hasInvalidItems
        );
    });
    if(hasInvalidOrder){
        throw new AppError(ERRORS.INVALID_MOCK_DATA);
    }
}

function validateMockDeliveries(deliveries){
    const validStatuses = Object.values(DELIVERY_STATUS);

    const hasInvalidDeliveries = deliveries.some((delivery)=>{
        const hasInvalidStatus= delivery.status !== undefined && 
        ( typeof delivery.status !== "string" || !validStatuses.includes(delivery.status));
        
        const hasInvalidAssignedAt = delivery.assignedAt !== undefined &&
        ( !(delivery.assignedAt instanceof Date) || Number.isNaN(delivery.assignedAt.getTime()));
        return hasInvalidStatus || hasInvalidAssignedAt;
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