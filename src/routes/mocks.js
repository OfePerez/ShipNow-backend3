const express= require('express');
const mocksController= require('../controllers/mocks.controller');

const router= express.Router();

router.get("/users", mocksController.getMockUsers);
router.get("/orders", mocksController.getMockOrders);
router.get("/deliveries", mocksController.getMockDeliveries);
router.get("/all", mocksController.getAllMocks);
router.post("/seed", mocksController.seedMocks);

module.exports= router;
