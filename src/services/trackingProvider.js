const logger = require("../config/logger");
const TRACKING_STATES = ["assigned", "in_transit", "out_for_delivery", "delivered"];

function getTrackingStatus(deliveryId) {
  logger.debug(`Consultando proveedor de tracking para la entrega ${deliveryId}`);

  // Derivamos un estado pseudo-aleatorio a partir del largo del id,
  // para no depender de Math.random ni de una llamada real.
  const id = String(deliveryId || "");
  const index = id.length % TRACKING_STATES.length;
  return TRACKING_STATES[index];
}

module.exports = { getTrackingStatus };
