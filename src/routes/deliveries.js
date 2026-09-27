const express = require("express");
const DeliveryController = require("../controllers/deliveries.controller");
const { uploadDeliveryProof } = require("../config/upload");
const router = express.Router();

// POST /api/deliveries -> crea una entrega vinculando order + courier
router.post("/", DeliveryController.create);

// GET /api/deliveries -> lista entregas
router.get("/", DeliveryController.getAll);

// GET /api/deliveries/:id -> obtiene una entrega por id (actua como tracking)
router.get("/:id", DeliveryController.getById);

// PATCH /api/deliveries/:id/status -> actualiza el estado de una entrega
router.patch("/:id/status", DeliveryController.updateStatus);
router.post("/:id/proof", uploadDeliveryProof, DeliveryController.addProof);

module.exports = router;
