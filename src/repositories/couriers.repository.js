const Courier = require("../models/courier");

class CourierRepository {
  static create(data) { return Courier.create(data); }
  static async getAll() { return Courier.find({}, { __v: 0 }).sort({ name: 1 }).lean(); }
  static getById(id) { return Courier.findById(id, { __v: 0 }).lean(); }
}

module.exports = CourierRepository;
