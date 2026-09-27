const productRepository= require('../repositories/product.repository');
const {PRODUCT_STATUS}= require('../constants');
const {AppError}  = require('../errors/AppError');
const {ERRORS}= require("../errors/errorDictionary");
const mongoose = require("mongoose");


async function createProduct(productData){
    const {name, price,stock=0, status}= productData;

    if(!name || typeof name !== 'string'){
        throw new AppError(ERRORS.PRODUCT_NAME_REQUIRED );
    }
    if (typeof price !== 'number' || price<0){
        throw new AppError(ERRORS.INVALID_PRODUCT_PRICE);
    }
    if(!Number.isInteger(stock) || stock <0){
        throw new AppError(ERRORS.INVALID_PRODUCT_STOCK);
    }
    if (status && !Object.values(PRODUCT_STATUS).includes(status)){
        throw new AppError(ERRORS.INVALID_PRODUCT_STATUS);
    }
    return productRepository.create({
        name:name.trim(),
        price,
        stock,
        status: status || PRODUCT_STATUS.AVAILABLE,
    });
}

async function getAllProducts(){
    return productRepository.getAll();
}

async function getProductById(id){
    if (!mongoose.isValidObjectId(id)) {
        throw new AppError(ERRORS.INVALID_RESOURCE_ID);
    }
    const product= await productRepository.getById(id);

    if(!product){
        throw new AppError(ERRORS.PRODUCT_NOT_FOUND);
    }
    return product;
}

module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
};
