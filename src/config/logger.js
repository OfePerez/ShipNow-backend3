const winston = require("winston");
require("winston-daily-rotate-file");
const config = require("./index");

const customLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const logFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, stack }) =>
    `${timestamp} [${level}] ${stack || message}`
  )
);

const transports = [];

if (config.NODE_ENV !== "test") {
  transports.push(new winston.transports.DailyRotateFile({
    dirname: "logs",
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxSize: "10m",
    maxFiles: "14d",
  }));
  transports.push(new winston.transports.DailyRotateFile({
    dirname: "logs",
    filename: "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: config.LOG_LEVEL,
    maxSize: "10m",
    maxFiles: "14d",
  }));
}

if (config.NODE_ENV === "development") {
  transports.unshift(new winston.transports.Console());
}

const logger = winston.createLogger({
  levels: customLevels,
  level: config.LOG_LEVEL,
  format: logFormat,
  transports,
  silent: config.NODE_ENV === "test",
});

module.exports = logger;
