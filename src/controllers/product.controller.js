const productService = require("../services/product.service");


async function create(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const product = await productService.getProductById(
      req.params.id
    );

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
};