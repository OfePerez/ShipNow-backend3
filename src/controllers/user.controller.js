const UserService = require("../services/users.service");

function handleError(res, error) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error("Error interno de Users:", error.message);
  }

  return res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Error del servidor"
        : error.message,
  });
}

class UserController {
  static async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = UserController;