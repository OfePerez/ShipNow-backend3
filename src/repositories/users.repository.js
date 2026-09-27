const User = require("../models/user");

class UserRepository {
  static async create(userData) {
    return User.create(userData);
  }

  static async findByEmail(email) {
    return User.findOne({ email }).lean();
  }

  static async getAll({ filter, skip, limit }) {
    const [users, total] = await Promise.all([
      User.find(filter, { __v: 0 })
        .sort({ first_name: 1, last_name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);
    return { users, total };
  }

  static async getById(id) {
    return User.findById(id, {
      __v: 0,
    }).lean();
  }

  static async addDocument(id, metadata) {
    return User.findByIdAndUpdate(
      id,
      { $push: { documents: metadata } },
      { new: true, runValidators: true }
    ).lean();
  }
}

module.exports = UserRepository;
