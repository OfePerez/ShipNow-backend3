const path = require("path");
const dotenv = require("dotenv");

const requestedEnvironment = process.env.NODE_ENV || "development";
const envFile = requestedEnvironment === "test" ? ".env.test" : ".env";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
  quiet: true,
});

if (requestedEnvironment === "test" && !process.env.MONGODB_URI_TEST) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env"), quiet: true });
}

if (!process.env.MONGODB_URI && !process.env.MONGODB_URI_TEST) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

const REQUIRED_ENV_VARS = ["PORT", "NODE_ENV"];

for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("La variable de entorno PORT debe ser un número válido");
}

const uploadMaxSizeMb = Number(process.env.UPLOAD_MAX_SIZE_MB || 5);

if (!Number.isFinite(uploadMaxSizeMb) || uploadMaxSizeMb <= 0) {
  throw new Error(
    "La variable UPLOAD_MAX_SIZE_MB debe ser un número mayor a 0"
  );
}

function parseBoolean(value, fallback) {
  if (value === undefined) return fallback;
  return value === "true";
}

const nodeEnv = process.env.NODE_ENV;

const config = Object.freeze({
  PORT: port,
  MONGODB_URI: process.env.MONGODB_URI_TEST || process.env.MONGODB_URI,
  TEST_DB_NAME: process.env.TEST_DB_NAME || "shipnow_test",
  NODE_ENV: nodeEnv,
  LOG_LEVEL:
    process.env.LOG_LEVEL || (nodeEnv === "production" ? "info" : "debug"),
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
  UPLOAD_MAX_SIZE_MB: uploadMaxSizeMb,
  INTERNAL_ENDPOINTS_ENABLED: parseBoolean(
    process.env.INTERNAL_ENDPOINTS_ENABLED,
    nodeEnv !== "production"
  ),
  SWAGGER_ENABLED: parseBoolean(process.env.SWAGGER_ENABLED, true),
});

module.exports = config;
