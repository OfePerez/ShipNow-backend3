const Delivery = require("../models/delivery");

class DeliveryRepository {
  static create(data) { return Delivery.create(data); }
  static async getAll({ filter, skip, limit }) {
    const [deliveries, total] = await Promise.all([
      Delivery.find(filter).sort({ assignedAt: -1 }).skip(skip).limit(limit).lean(),
      Delivery.countDocuments(filter),
    ]);
    return { deliveries, total };
  }
  static getById(id) { return Delivery.findById(id).lean(); }
  static updateStatus(id, status) {
    return Delivery.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();
  }
  static addProof(id, metadata) {
    return Delivery.findByIdAndUpdate(id, { $push: { proofs: metadata } }, { new: true, runValidators: true }).lean();
  }
}
module.exports = DeliveryRepository;
