process.env.NODE_ENV = "test";
process.env.UPLOAD_DIR = "uploads-test";
process.env.INTERNAL_ENDPOINTS_ENABLED = "true";

const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../src/db");

exports.mochaHooks = {
  async beforeAll() {
    await connectDB();
    await mongoose.connection.db.dropDatabase();
  },
  async afterEach() {
    const collections = await mongoose.connection.db.collections();
    await Promise.all(collections.map(collection => collection.deleteMany({})));
  },
  async afterAll() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await fs.rm(path.resolve(process.cwd(), "uploads-test"), { recursive: true, force: true });
  },
};
