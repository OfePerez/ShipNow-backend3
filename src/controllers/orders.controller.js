const OrderService = require("../services/orders.service");

class OrderController {
    static async create(req, res, next) {
        try {
        const order = await OrderService.create(req.body);

        return res.status(201).json({
            status: "success",
            message: "Pedido creado correctamente",
            payload: order,
        });
        } catch (error) {
        next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
        const { orders, pagination } = await OrderService.getAll(req.query);

        return res.status(200).json({
            status: "success",
            payload: orders,
            pagination,
        });
        } catch (error) {
        next(error);
        }
    }

    static async getById(req, res, next) {
        try {
        const order = await OrderService.getById(req.params.id);

        return res.status(200).json({
            status: "success",
            payload: order,
        });
        } catch (error) {
        next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
        const order = await OrderService.updateStatus(
            req.params.id,
            req.body.status
        );

        return res.status(200).json({
            status: "success",
            message: "Estado del pedido actualizado correctamente",
            payload: order,
        });
        } catch (error) {
        next(error);
        }
    }

    static async deleteById(req, res, next) {
        try {
        const order = await OrderService.deleteById(req.params.id);

        return res.status(200).json({
            status: "success",
            message: "Pedido eliminado correctamente",
            payload: order,
        });
        } catch (error) {
        next(error);
        }
    }
    }

module.exports = OrderController;