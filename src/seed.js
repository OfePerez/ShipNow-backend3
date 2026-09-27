const mongoose = require("mongoose");
const connectDB = require("./db");
const mocksService = require("./services/mocks.service");
const logger = require("./config/logger");

async function seed() {
  try {
    await connectDB();
    const created = await mocksService.seedMocks();
    logger.info(`Seed completado: ${created.users.length} usuarios, ${created.orders.length} pedidos y ${created.deliveries.length} entregas`);
  } catch (error) {
    logger.fatal(`No se pudo ejecutar el seed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
