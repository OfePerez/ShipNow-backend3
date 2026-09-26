const express = require("express");
const router = express.Router();

const Courier = require("../models/courier");
const logger = require("../config/logger");



// POST /api/couriers -> crea un repartidor
router.post("/", async (req, res, next) => {
  try {
    const { name, zone, available } = req.body;

    // Validacion manual inline.
    if (!name || !zone) {
      logger.warning(`Intento de crear un repartidor sin los datos obligatorios`);
      return res.status(400).send("Faltan datos obligatorios del repartidor");
    }

    const courier = await Courier.create({
      name,
      zone,
      available: available !== undefined ? available : true,
    });

    logger.info(`repartidor creado correctamente: ${courier._id}`);
    res.status(201).json(courier);
  } catch (error) {
    next(error);
  }
});

// GET /api/couriers -> lista repartidores
router.get("/", async (req, res, next) => {
  try {
    const couriers = await Courier.find();
    res.json(couriers);
  } catch (error) {
    next(error);
  }
});

// GET /api/couriers/:id -> obtiene un repartidor por id
router.get("/:id", async (req, res, next) => {
  try {
    const courier = await Courier.findById(req.params.id);
    if (!courier) {
      logger.warning(`Repartidor no encontrado: ${req.params.id}`);
      return res.status(404).send("Repartidor no encontrado");
    }
    res.json(courier);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
