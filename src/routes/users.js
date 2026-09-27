const express = require("express");
const UserController = require("../controllers/user.controller");
const { uploadUserDocument } = require("../config/upload");

const router = express.Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/:id/documents", uploadUserDocument, UserController.addDocument);

module.exports = router;
