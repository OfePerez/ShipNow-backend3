const logger = require("../config/logger");



function sendNotification(message) {
  logger.info(`Notificación enviada: ${message}`);
}

module.exports = sendNotification;
