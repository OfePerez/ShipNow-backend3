const mongoose = require('mongoose');
const config = require('./config');
const logger = require("./config/logger");

async function connectDB() {
    const options = config.NODE_ENV === "test" ? { dbName: config.TEST_DB_NAME } : {};
    await mongoose.connect(config.MONGODB_URI, options);
    logger.info('Conexión a MongoDB establecida');
}

module.exports = connectDB;
