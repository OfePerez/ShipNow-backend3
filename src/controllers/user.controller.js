const UserService = require("../services/users.service");


class UserController {
  static async create(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;