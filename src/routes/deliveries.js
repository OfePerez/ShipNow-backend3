const express = require("express");
const router = express.Router();

const Delivery = require("../models/delivery");
const Order = require("../models/order");
const Courier = require("../models/courier");
const { getTrackingStatus } = require("../services/trackingProvider");
const logger = require("../config/logger");

// CRUD basico de entregas (deliveries). Misma deuda tecnica que el resto:
// validacion manual + acceso directo a DB dentro de la ruta, sin service/repository.

// POST /api/deliveries -> crea una entrega vinculando order + courier
router.post("/", async (req, res, next) => {
  try {
    const { orderId, courierId, status } = req.body;

    // Validacion manual inline.
    if (!orderId || !courierId) {
      logger.warning(`Intento de crear una entrega sin orderId o courierId`);
      return res.status(400).send("Faltan orderId o courierId");
    }

    // Verificamos que existan haciendo las consultas DIRECTO en la ruta (sucio a proposito).
    const order = await Order.findById(orderId);
    if (!order) {
      logger.warning(`pedido no encontrado para crear la entrega: ${orderId}`);
      return res.status(404).send("Order no encontrada");
    }
    const courier = await Courier.findById(courierId);
    if (!courier) {
      logger.warning(`Repartidor no encontrado para crear la entrega: ${courierId}`);
      return res.status(404).send("Courier no encontrado");
    }

    const delivery = await Delivery.create({
      orderId,
      courierId,
      status: status || "assigned",
      assignedAt: new Date(),
    });

    logger.info(`Entrega creada correctamente: ${delivery._id}`);
    res.status(201).json(delivery);
  } catch (error) {
    next(error);
  }
});

// GET /api/deliveries -> lista entregas
router.get("/", async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
});

// GET /api/deliveries/:id -> obtiene una entrega por id (actua como tracking)
router.get("/:id", async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      logger.warning(`Entrega no encontrada: ${req.params.id}`);
      return res.status(404).send("Delivery no encontrada");
    }

    
    const trackingStatus = getTrackingStatus(delivery._id);

    res.json({
      delivery,
      tracking: { status: trackingStatus },
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/deliveries/:id/status -> actualiza el estado de una entrega
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      logger.warning(`Intento de actualizar la entrega ${req.params.id} sin estado`);
      return res.status(400).send("Falta el status");
    }

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      logger.warning(`Entrega no encontrada: ${req.params.id}`);
      return res.status(404).send("Delivery no encontrada");
    }

    delivery.status = status;
    await delivery.save();

    logger.info(`Entrega ${delivery._id} actualizada al estado ${status}`);
    res.json(delivery);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
