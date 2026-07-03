const dotenv = require('dotenv');

dotenv.config();

const REQUIRED_ENV_VARS = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
    }
}

const port= Number(process.env.PORT);

if(!Number.isInteger(port) || port<=0){
    throw new Error('La variable de entorno PORT debe ser un número válido');
}
const config = Object.freeze({
    PORT: port,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
});

module.exports = config;
