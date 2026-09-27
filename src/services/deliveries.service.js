const mongoose = require("mongoose");
const DeliveryRepository = require("../repositories/deliveries.repository");
const OrderRepository = require("../repositories/orders.repository");
const CourierRepository = require("../repositories/couriers.repository");
const { getTrackingStatus } = require("./trackingProvider");
const { DELIVERY_STATUS } = require("../constants");
const { AppError } = require("../errors/AppError");
const { ERRORS } = require("../errors/errorDictionary");
const logger = require("../config/logger");
const { buildFileMetadata, removeFileIfExists } = require("../utils/files");

class DeliveryService {
  static async create({ orderId, courierId, status }) {
    if (!orderId || !courierId) throw new AppError(ERRORS.DELIVERY_REQUIRED_FIELDS);
    if (!mongoose.isValidObjectId(orderId) || !mongoose.isValidObjectId(courierId)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    if (status && !Object.values(DELIVERY_STATUS).includes(status)) throw new AppError(ERRORS.INVALID_DELIVERY_STATUS);
    if (!await OrderRepository.getById(orderId)) throw new AppError(ERRORS.ORDER_NOT_FOUND);
    if (!await CourierRepository.getById(courierId)) throw new AppError(ERRORS.COURIER_NOT_FOUND);
    const delivery = await DeliveryRepository.create({ orderId, courierId, status: status || DELIVERY_STATUS.ASSIGNED, assignedAt: new Date() });
    logger.info(`Entrega creada correctamente: ${delivery._id}`);
    return delivery;
  }
  static async getAll(query = {}) {
    const page = Number(query.page || 1), limit = Number(query.limit || 10);
    if (!Number.isInteger(page) || page <= 0 || !Number.isInteger(limit) || limit <= 0 || limit > 100) throw new AppError(ERRORS.INVALID_PAGINATION);
    const filter = {};
    if (query.status) {
      if (!Object.values(DELIVERY_STATUS).includes(query.status)) throw new AppError(ERRORS.INVALID_DELIVERY_STATUS);
      filter.status = query.status;
    }
    const { deliveries, total } = await DeliveryRepository.getAll({ filter, skip: (page - 1) * limit, limit });
    return { deliveries, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }
  static async getById(id) {
    if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    const delivery = await DeliveryRepository.getById(id);
    if (!delivery) throw new AppError(ERRORS.DELIVERY_NOT_FOUND);
    return { delivery, tracking: { status: getTrackingStatus(delivery._id) } };
  }
  static async updateStatus(id, status) {
    if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    if (!status) throw new AppError(ERRORS.DELIVERY_STATUS_REQUIRED);
    if (!Object.values(DELIVERY_STATUS).includes(status)) throw new AppError(ERRORS.INVALID_DELIVERY_STATUS);
    const delivery = await DeliveryRepository.updateStatus(id, status);
    if (!delivery) throw new AppError(ERRORS.DELIVERY_NOT_FOUND);
    logger.info(`Entrega ${id} actualizada al estado ${status}`);
    return delivery;
  }
  static async addProof(id, file) {
    try {
      if (!file) throw new AppError(ERRORS.FILE_REQUIRED);
      if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
      const delivery = await DeliveryRepository.addProof(id, buildFileMetadata(file, "delivery-proof"));
      if (!delivery) throw new AppError(ERRORS.DELIVERY_NOT_FOUND);
      logger.info(`Comprobante asociado a la entrega ${id}`);
      return delivery;
    } catch (error) {
      await removeFileIfExists(file?.path);
      throw error;
    }
  }
}
module.exports = DeliveryService;
