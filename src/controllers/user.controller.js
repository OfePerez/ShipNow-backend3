const UserService = require("../services/users.service");


class UserController {
  static async create(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json({ status: "success", message: "Usuario creado correctamente", payload: user });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { users, pagination } = await UserService.getAll(req.query);
      return res.status(200).json({ status: "success", payload: users, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      return res.status(200).json({ status: "success", payload: user });
    } catch (error) {
      next(error);
    }
  }

  static async addDocument(req, res, next) {
    try {
      const user = await UserService.addDocument(req.params.id, req.body.documentType, req.file);
      return res.status(201).json({ status: "success", message: "Documento cargado correctamente", payload: user });
    } catch (error) { next(error); }
  }
}

module.exports = UserController;
