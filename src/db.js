const mongoose = require('mongoose');
const config = require('./config');
const logger = require("./config/logger");

async function connectDB() {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Conexión a MongoDB establecida');
}

module.exports = connectDB;