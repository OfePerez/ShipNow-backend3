const UserRepository = require("../repositories/users.repository");
const { USER_ROLES } = require("../constants");
const AppError= require("../errors/AppError");
const {ERRORS}= require("../errors/errorDictionary");


class UserService {
  static async create({ name, email, role }) {
    if (!name || typeof name !== "string") {
      throw new AppError(ERRORS.USER_NAME_REQUIRED);
    }

    if (!email || typeof email !== "string") {
      throw new AppError(ERRORS.USER_EMAIL_REQUIRED);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalizedEmail
    );

    if (!emailIsValid) {
      throw new AppError(ERRORS.INVALID_EMAIL_FORMAT);
    }

    if (role && !Object.values(USER_ROLES).includes(role)) {
      throw new AppError(ERRORS.INVALID_USER_ROLE);
    }

    const existingUser =
      await UserRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new AppError(ERRORS.USER_EMAIL_ALREADY_EXISTS);
    }

    return UserRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      role: role || USER_ROLES.USER,
    });
  }

  static async getAll() {
    return UserRepository.getAll();
  }

  static async getById(id) {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new AppError(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }
}

module.exports = UserService;