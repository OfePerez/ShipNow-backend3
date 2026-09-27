const CourierService = require("../services/couriers.service");

class CourierController {
  static async create(req, res, next) {
    try {
      const courier = await CourierService.create(req.body);
      res.status(201).json({ status: "success", message: "Repartidor creado correctamente", payload: courier });
    } catch (error) { next(error); }
  }
  static async getAll(_req, res, next) {
    try { res.json({ status: "success", payload: await CourierService.getAll() }); }
    catch (error) { next(error); }
  }
  static async getById(req, res, next) {
    try { res.json({ status: "success", payload: await CourierService.getById(req.params.id) }); }
    catch (error) { next(error); }
  }
}
module.exports = CourierController;
