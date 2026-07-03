const mongoose = require('mongoose');
const config = require('./config');

async function connectDB() {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Conectado correctamente a MongoDB');
}

module.exports = connectDB;