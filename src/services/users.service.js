const UserRepository = require("../repositories/users.repository");
const { USER_ROLES } = require("../constants");
const {AppError}= require("../errors/AppError");
const {ERRORS}= require("../errors/errorDictionary");


class UserService {
  static async create({ first_name, last_name,  email, role }) {
    if (typeof first_name!== "string" || !first_name.trim()) {
      throw new AppError(ERRORS.USER_FIRST_NAME_REQUIRED);
    }
    if(typeof last_name!== "string" ||!last_name.trim()) {
      throw new AppError(ERRORS.USER_LAST_NAME_REQUIRED);
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
      first_name: first_name.trim(),
      last_name: last_name.trim(),
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