const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.post("/", productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

module.exports = router;