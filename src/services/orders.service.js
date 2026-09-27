const mongoose = require("mongoose");
const OrderRepository= require("../repositories/orders.repository");
const sendNotification = require("./notifications");
const logger = require("../config/logger");
const {AppError} = require("../errors/AppError");
const {ERRORS} = require("../errors/errorDictionary");
const {ORDER_STATUS, ORDER_PRIORITY} = require("../constants");



class OrderService {
    static async create(data) {
        const{
            customerName,
            customer,
            address,
            weight,
            courierId,
            items,
            priority
        } = data;

        if (
            typeof customerName !== "string" ||
            !customerName.trim() ||
            typeof address !== "string" ||
            !address.trim() ||
            weight === undefined
        ) {
            throw new AppError(ERRORS.ORDER_REQUIRED_FIELDS);
        }
        if (typeof weight !== "number" || weight <= 0) {
            throw new AppError(ERRORS.INVALID_ORDER_WEIGHT);
        }
        if (
            priority !== undefined &&
            !Object.values(ORDER_PRIORITY).includes(priority)
        ){
            throw new AppError(ERRORS.INVALID_ORDER_PRIORITY);
        }
        if (items !== undefined && !Array.isArray(items)) {
            throw new AppError(ERRORS.INVALID_ORDER_ITEMS);
    }

        const shippingCost = weight * 10;

        const order = await OrderRepository.create({
            customerName: customerName.trim(),
            customer: customer || null,
            address: address.trim(),
            weight,
            cost: shippingCost,
            status: "pending",
            priority: priority || ORDER_PRIORITY.NORMAL,
            items: items || [],
            courierId: courierId || null,
        });

        sendNotification(
            `Nuevo envío creado para ${customerName} por $${shippingCost}`
        );

        logger.info(`Pedido creado correctamente: ${order._id}`);

        if (!courierId) {
            logger.warning(`Pedido ${order._id} creado sin repartidor asignado`);
        }

            return order;
        }
        static async getAll(query = {}) {
    const {
        page = "1",
        limit = "10",
        status,
        priority,
    } = query;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (
        !Number.isInteger(parsedPage) ||
        parsedPage <= 0 ||
        !Number.isInteger(parsedLimit) ||
        parsedLimit <= 0 ||
        parsedLimit > 100
    ) {
        throw new AppError(ERRORS.INVALID_PAGINATION);
    }

    const filter = {};

    if (status) {
        if (!Object.values(ORDER_STATUS).includes(status)) {
        throw new AppError(ERRORS.INVALID_ORDER_STATUS);
        }

    filter.status = status;
    }

    if (priority) {
        if (!Object.values(ORDER_PRIORITY).includes(priority)) {
        throw new AppError(ERRORS.INVALID_ORDER_PRIORITY);
    }

    filter.priority = priority;
    }

    const skip = (parsedPage - 1) * parsedLimit;

    const { orders, total } = await OrderRepository.getAll({
        filter,
        skip,
        limit: parsedLimit,
    });

        return {
        orders,
        pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        },
    };
}

static async getById(id) {
    if (!mongoose.isValidObjectId(id)) {
    throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    }

    const order = await OrderRepository.getById(id);

    if (!order) {
    throw new AppError(ERRORS.ORDER_NOT_FOUND);
    }

    return order;
}

static async updateStatus(id, status) {
    if (!mongoose.isValidObjectId(id)) {
    throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    }

    if (!status) {
    throw new AppError(ERRORS.ORDER_STATUS_REQUIRED);
    }

    if (!Object.values(ORDER_STATUS).includes(status)) {
    throw new AppError(ERRORS.INVALID_ORDER_STATUS);
    }

    const order = await OrderRepository.updateStatus(id, status);

    if (!order) {
    throw new AppError(ERRORS.ORDER_NOT_FOUND);
    }

    logger.info(`Pedido ${order._id} actualizado al estado ${status}`);

    return order;
}

static async deleteById(id) {
    if (!mongoose.isValidObjectId(id)) {
    throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    }

    const order = await OrderRepository.deleteById(id);

    if (!order) {
    throw new AppError(ERRORS.ORDER_NOT_FOUND);
    }

    logger.info(`Pedido eliminado correctamente: ${order._id}`);

    return order;
}
    }


module.exports= OrderService;
