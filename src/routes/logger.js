const express = require("express");
const logger = require("../config/logger");

const router = express.Router();

router.get("/test", (req, res) =>{
    logger.debug("Prueba del nivel debug");
    logger.http("Prueba del nivel http");
    logger.info("Prueba del nivel info");
    logger.warning("Prueba del nivel warning");
    logger.error("Prueba del nivel error");
    logger.fatal("Prueba del nivel fatal");

    res.json({
        status: "success",
        message: "Logs de prueba generados correctamente",
    });
});

module.exports = router;