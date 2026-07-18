const User= require('../models/user');
const Order= require('../models/order');
const Delivery=require('../models/delivery');
const {USER_ROLES}= require('../constants');
const delivery = require('../models/delivery');

async function seedMocks({users, orders, deliveries}) {
    const mockEmails= users.map((user)=> user.email);

    await User.deleteMany({ email:{$in: mockEmails}});

    const createdUsers= await User.insertMany(users);

    const customers= createdUsers.filter((user)=> user.role === USER_ROLES.USER);
    const couriers= createdUsers.filter((user)=> user.role === USER_ROLES.COURIER);

    const ordersToCreate= orders.map((order, index)=> {
        const customer= customers[index % customers.length];
        const courier= couriers[index % couriers.length];

        return{
            ...order,
            customer: customer._id,
            customerName: `${customer.first_name} ${customer.last_name}`,
            courierId: courier._id,
        };
    });

    const createdOrders= await Order.insertMany(ordersToCreate);

    const deliveriesToCreate= deliveries.map((delivery, index)=>{
        const order= createdOrders[index % createdOrders.length];
        const courier= couriers[index % couriers.length];

        return{
            ...delivery,
            orderId:order._id,
            courierId: courier._id,
        };
    });

    const createdDeliveries = await Delivery.insertMany(deliveriesToCreate);

    return{
        users: createdUsers,
        orders: createdOrders,
        deliveries: createdDeliveries,
    };
}

module.exports= {
    seedMocks,
};
