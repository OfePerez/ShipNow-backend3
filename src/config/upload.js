const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
const multer = require("multer");
const config = require("./index");
const logger = require("./logger");
const { AppError } = require("../errors/AppError");
const { ERRORS } = require("../errors/errorDictionary");

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const uploadRoot = path.resolve(process.cwd(), config.UPLOAD_DIR);

function createStorage(subdirectory) {
  const destination = path.join(uploadRoot, subdirectory);

  return multer.diskStorage({
    destination: (_req, _file, callback) => {
      fs.mkdir(destination, { recursive: true }, (error) => callback(error, destination));
    },
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${randomUUID()}${extension}`);
    },
  });
}

function fileFilter(_req, file, callback) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    logger.warning(`Intento de cargar un tipo no permitido: ${file.mimetype}`);
    return callback(new AppError(ERRORS.INVALID_FILE_TYPE));
  }

  callback(null, true);
}

function normalizeUploadError(error) {
  if (!(error instanceof multer.MulterError)) return error;

  if (error.code === "LIMIT_FILE_SIZE") {
    return new AppError(ERRORS.FILE_TOO_LARGE);
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return new AppError(ERRORS.INVALID_FILE_FIELD);
  }

  return new AppError(ERRORS.FILE_SAVE_ERROR);
}

function singleFileUpload({ subdirectory, fieldName }) {
  const upload = multer({
    storage: createStorage(subdirectory),
    fileFilter,
    limits: {
      fileSize: config.UPLOAD_MAX_SIZE_MB * 1024 * 1024,
      files: 1,
    },
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (error) return next(normalizeUploadError(error));
      next();
    });
  };
}

const uploadUserDocument = singleFileUpload({
  subdirectory: "users",
  fieldName: "document",
});

const uploadDeliveryProof = singleFileUpload({
  subdirectory: "deliveries",
  fieldName: "proof",
});

module.exports = {
  ALLOWED_MIME_TYPES,
  uploadUserDocument,
  uploadDeliveryProof,
};
