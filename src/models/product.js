const mongoose = require("mongoose");
const {PRODUCT_STATUS}= require('../constants');


// Modelo de Product (producto del catalogo).
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min:0},
  stock: { type: Number, default: 0, min:0 },
  status: { type: String, enum: Object.values(PRODUCT_STATUS), default: PRODUCT_STATUS.AVAILABLE}, // available | out_of_stock
});

module.exports = mongoose.model("Product", productSchema);
