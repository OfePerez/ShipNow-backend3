const express = require("express");
const CourierController = require("../controllers/couriers.controller");
const router = express.Router();

router.post("/", CourierController.create);
router.get("/", CourierController.getAll);
router.get("/:id", CourierController.getById);

module.exports = router;
