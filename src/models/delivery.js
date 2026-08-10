const mongoose = require("mongoose");
const {DELIVERY_STATUS}= require("../constants")



// Modelo de Delivery (entrega: vincula un Order con un Courier).
const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  courierId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { 
    type: String,
    enum: Object.values(DELIVERY_STATUS),
    default: DELIVERY_STATUS.ASSIGNED,
  }, 
  assignedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Delivery", deliverySchema);
