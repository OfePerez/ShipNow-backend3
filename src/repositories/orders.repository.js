const Order= require("../models/order");

class OrderRepository {
    static create(data) {
        return Order.create(data);
    }

    static async getAll({filter, skip, limit}) {
        const [orders, total] = await Promise.all([
            Order.find(filter).skip(skip).limit(limit).lean(),
            Order.countDocuments(filter),
        ]);

        return{
            orders,
            total,
        };
    }
    static getById(id) {
        return Order.findById(id).lean();
    }
    static updateStatus(id,status){
        return Order.findByIdAndUpdate(
            id,
            {status},
            {
                new: true,
                runValidators: true,
            }
        ).lean();
    }

    static deleteById(id) {
        return Order.findByIdAndDelete(id).lean();
    }
}

module.exports = OrderRepository;