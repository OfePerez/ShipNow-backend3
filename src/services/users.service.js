const UserRepository = require("../repositories/users.repository");
const { USER_ROLES } = require("../constants");

function createServiceError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

class UserService {
  static async create({ name, email, role }) {
    if (!name || typeof name !== "string") {
      throw createServiceError(
        "El nombre del usuario es obligatorio",
        400
      );
    }

    if (!email || typeof email !== "string") {
      throw createServiceError(
        "El email del usuario es obligatorio",
        400
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalizedEmail
    );

    if (!emailIsValid) {
      throw createServiceError(
        "El formato del email no es válido",
        400
      );
    }

    if (role && !Object.values(USER_ROLES).includes(role)) {
      throw createServiceError(
        "El rol del usuario no es válido",
        400
      );
    }

    const existingUser =
      await UserRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw createServiceError(
        "Ya existe un usuario con ese email",
        409
      );
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
      throw createServiceError("Usuario no encontrado", 404);
    }

    return user;
  }
}

module.exports = UserService;