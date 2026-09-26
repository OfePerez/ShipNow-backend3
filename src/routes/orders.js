const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const sendNotification = require("../services/notifications");
const logger = require("../config/logger");

// POST /api/orders -> crea un envio
router.post("/", async (req, res, next) => {
  try {
    const { customerName, customer, address, weight, courierId, items, priority } =
      req.body;

    if (!customerName || !address || !weight) {
      logger.warning(`Intento de crear un pedido sin los datos obligatorios`);
      return res.status(400).send("Faltan datos obligatorios del envio");
    }
    if (typeof weight !== "number" || weight <= 0) {
      logger.warning(`Intento de crear un pedido con peso inválido`);
      return res.status(400).send("El peso debe ser un numero mayor a 0");
    }

    const shippingCost = weight * 10;

    const order = await Order.create({
      customerName,
      customer: customer || null,
      address,
      weight,
      cost: shippingCost,
      status: "pending",
      priority: priority || "normal",
      items: items || [],
      courierId: courierId || null,
    });

    sendNotification(
      "Nuevo envio creado para " + customerName + " por $" + shippingCost
    );

    logger.info(`Pedido creado correctamente: ${order._id}`);
    if(!courierId){
      logger.warning(`Pedido ${order._id} creado sin repartidor asignado`);
    }
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders -> lista todos los envios
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id -> obtiene un envio por id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      logger.warning(`pedido no encontrado: ${req.params.id}`);
      return res.status(404).send("Envio no encontrado");
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/orders/:id/status -> cambia el estado de un envio
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      logger.warning(`Intento de actualizar el pedido ${req.params.id} sin indicar estado`);
      return res.status(400).send("Falta el status");
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      logger.warning(`Pedido no encontrado: ${req.params.id}`);
      return res.status(404).send("Envio no encontrado");
    }

    order.status = status;
    await order.save();

    logger.info(`Pedido ${order._id} actualizado al estado ${status}`);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
