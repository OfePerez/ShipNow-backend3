const mongoose = require("mongoose");
const CourierRepository = require("../repositories/couriers.repository");
const { AppError } = require("../errors/AppError");
const { ERRORS } = require("../errors/errorDictionary");
const logger = require("../config/logger");

class CourierService {
  static async create({ name, zone, available }) {
    if (typeof name !== "string" || !name.trim() || typeof zone !== "string" || !zone.trim()) {
      throw new AppError(ERRORS.COURIER_REQUIRED_FIELDS);
    }
    const courier = await CourierRepository.create({
      name: name.trim(), zone: zone.trim(), available: available === undefined ? true : Boolean(available),
    });
    logger.info(`Repartidor creado correctamente: ${courier._id}`);
    return courier;
  }
  static getAll() { return CourierRepository.getAll(); }
  static async getById(id) {
    if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    const courier = await CourierRepository.getById(id);
    if (!courier) throw new AppError(ERRORS.COURIER_NOT_FOUND);
    return courier;
  }
}
module.exports = CourierService;
