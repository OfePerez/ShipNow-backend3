const express = require("express");
const request = require("supertest");

const errorHandler = require("../src/middlewares/errorHandler");
const { AppError } = require("../src/errors/AppError");

function createTestApp(errorToThrow) {
  const app = express();

  app.get("/test-error", (req, res, next) => {
    next(errorToThrow);
  });

  app.use(errorHandler);

  return app;
}

describe("Middleware global de errores", () => {
  test("devuelve los datos de un AppError conocido", async () => {
    const error = new AppError({
      statusCode: 400,
      message: "Cantidad de mocks inválida",
      code: "INVALID_MOCK_QUANTITY",
    });

    const app = createTestApp(error);

    const response = await request(app).get("/test-error");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Cantidad de mocks inválida",
      code: "INVALID_MOCK_QUANTITY",
    });
  });

  test("devuelve un error 500 genérico ante un error inesperado", async () => {
    const error = new Error("Error técnico sensible");

    const app = createTestApp(error);

    const response = await request(app).get("/test-error");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      status: "error",
      message: "Error interno del servidor",
      code: "INTERNAL_SERVER_ERROR",
    });
  });
});