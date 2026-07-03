const User = require("../models/user");

class UserRepository {
  static async create(userData) {
    return User.create(userData);
  }

  static async findByEmail(email) {
    return User.findOne({ email }).lean();
  }

  static async getAll() {
    return User.find(
      {},
      {
        __v: 0,
      }
    )
      .sort({ name: 1 })
      .lean();
  }

  static async getById(id) {
    return User.findById(id, {
      __v: 0,
    }).lean();
  }
}

module.exports = UserRepository;