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

const logFormat= winston.format.combine(
    winston.format.errors({ stack: true}),
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(({ timestamp, level, message, stack}) =>{
        return `${timestamp} [${level}] ${stack || message}`;
    })
);


const logger = winston.createLogger({
    levels: customLevels,
    level:  config.NODE_ENV === "production" ? "info" : "debug",
    format: logFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            dirname: "logs",
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "10m",
            maxFiles: "14d"
        }),
    ],
});

module.exports= logger;