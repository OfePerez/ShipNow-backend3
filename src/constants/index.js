const PRODUCT_STATUS= Object.freeze({
    AVAILABLE: 'available',
    OUT_OF_STOCK:'out_of_stock',
});

const USER_ROLES= Object.freeze({
    ADMIN: 'admin',
    USER:'user',
    COURIER: 'courier',
});

const ORDER_STATUS= Object.freeze({
    PENDING:'pending',
    IN_TRANSIT:'in_transit',
    DELIVERED:'delivered',
});

const ORDER_PRIORITY= Object.freeze({
    NORMAL:'normal',
    HIGH:'high',
});

const DELIVERY_STATUS= Object.freeze({
    ASSIGNED: 'assigned',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
})
module.exports={
    PRODUCT_STATUS,
    USER_ROLES,
    ORDER_STATUS,
    ORDER_PRIORITY,
    DELIVERY_STATUS,
}