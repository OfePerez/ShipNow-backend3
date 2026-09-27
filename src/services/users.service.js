const UserRepository = require("../repositories/users.repository");
const { USER_ROLES } = require("../constants");
const {AppError}= require("../errors/AppError");
const {ERRORS}= require("../errors/errorDictionary");
const mongoose = require("mongoose");
const logger = require("../config/logger");
const { buildFileMetadata, removeFileIfExists } = require("../utils/files");

const DOCUMENT_TYPES = ["identity", "address", "other"];


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

  static async getAll(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    if (!Number.isInteger(page) || page <= 0 || !Number.isInteger(limit) || limit <= 0 || limit > 100) {
      throw new AppError(ERRORS.INVALID_PAGINATION);
    }
    const filter = {};
    if (query.role) {
      if (!Object.values(USER_ROLES).includes(query.role)) throw new AppError(ERRORS.INVALID_USER_ROLE);
      filter.role = query.role;
    }
    const { users, total } = await UserRepository.getAll({ filter, skip: (page - 1) * limit, limit });
    return { users, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getById(id) {
    if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new AppError(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }

  static async addDocument(id, documentType, file) {
    try {
      if (!file) throw new AppError(ERRORS.FILE_REQUIRED);
      if (!mongoose.isValidObjectId(id)) throw new AppError(ERRORS.INVALID_RESOURCE_ID);
      if (!DOCUMENT_TYPES.includes(documentType)) throw new AppError(ERRORS.INVALID_DOCUMENT_TYPE);
      const metadata = buildFileMetadata(file, documentType);
      const user = await UserRepository.addDocument(id, metadata);
      if (!user) throw new AppError(ERRORS.USER_NOT_FOUND);
      logger.info(`Documento cargado para el usuario ${id}`);
      return user;
    } catch (error) {
      await removeFileIfExists(file?.path);
      throw error;
    }
  }
}

UserService.DOCUMENT_TYPES = DOCUMENT_TYPES;
module.exports = UserService;
