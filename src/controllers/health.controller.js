const config = require("../config");

function getHealth(_req, res) {
  res.json({
    status: "success",
    payload: {
      api: "ok",
      environment: config.NODE_ENV,
      uptime: Number(process.uptime().toFixed(2)),
      timestamp: new Date().toISOString(),
    },
  });
}
module.exports = { getHealth };
