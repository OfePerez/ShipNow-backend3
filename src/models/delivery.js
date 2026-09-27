const mongoose = require("mongoose");
const {DELIVERY_STATUS}= require("../constants")
const fileMetadataSchema = require("./schemas/fileMetadata");



// Modelo de Delivery (entrega: vincula un Order con un Courier).
const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  courierId: { type: mongoose.Schema.Types.ObjectId, ref: "Courier" },
  status: { 
    type: String,
    enum: Object.values(DELIVERY_STATUS),
    default: DELIVERY_STATUS.ASSIGNED,
  }, 
  assignedAt: { type: Date, default: Date.now },
  proofs: {
    type: [fileMetadataSchema],
    default: [],
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
