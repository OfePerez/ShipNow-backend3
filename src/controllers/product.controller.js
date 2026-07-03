const productService = require("../services/product.service");

function handleError(res, error) {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error("Error interno de Products:", error.message);
  }

  return res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Error del servidor"
        : error.message,
  });
}

async function create(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return handleError(res, error);
  }
}

async function getAll(req, res) {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return handleError(res, error);
  }
}

async function getById(req, res) {
  try {
    const product = await productService.getProductById(
      req.params.id
    );

    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
};