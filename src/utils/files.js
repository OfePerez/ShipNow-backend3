const fs = require("fs/promises");
const path = require("path");

function buildFileMetadata(file, documentType) {
  return {
    originalName: file.originalname,
    generatedName: file.filename,
    path: path.relative(process.cwd(), file.path).replace(/\\/g, "/"),
    mimeType: file.mimetype,
    size: file.size,
    documentType,
    uploadedAt: new Date(),
  };
}

async function removeFileIfExists(filePath) {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

module.exports = { buildFileMetadata, removeFileIfExists };
