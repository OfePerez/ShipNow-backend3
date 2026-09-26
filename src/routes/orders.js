const express = require("express");
const OrderController = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.patch("/:id/status", OrderController.updateStatus);
router.delete("/:id", OrderController.deleteById);

module.exports = router;