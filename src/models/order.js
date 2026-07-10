const mongoose = require("mongoose");
const { ORDER_STATUS, ORDER_PRIORITY}= require('../constants');

// Modelo de Order (envio/pedido).
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, // se mantiene del v1 original
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String, required: true },
  weight: { type: Number, required: true },
  cost: { type: Number }, // se calcula en la ruta: cost = weight * 10
  status: { 
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  }, 
  priority: { 
    type: String,
    enum: Object.values(ORDER_PRIORITY),
    default: ORDER_PRIORITY.NORMAL,
  },
  items: [
    {
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
  courierId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
