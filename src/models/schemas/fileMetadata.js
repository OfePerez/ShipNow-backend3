const mongoose = require("mongoose");

const fileMetadataSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    generatedName: { type: String, required: true },
    path: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    documentType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

module.exports = fileMetadataSchema;
