const productRepository= require('../repositories/product.repository');
const {PRODUCT_STATUS}= require('../constants');
const AppError  = require('../errors/AppError');


async function createProduct(productData){
    const {name, price,stock=0, status}= productData;

    if(!name || typeof name !== 'string'){
        throw new AppError('El nombre del producto es obligatorio', 400,"PRODUCT_NAME_REQUIRED" );
    }
    if (typeof price !== 'number' || price<0){
        throw new AppError('El precio debe ser un número mayor o igual a 0',400, "INVALID_PRODUCT_PRICE");
    }
    if(!Number.isInteger(stock) || stock <0){
        throw new AppError('El stock debe ser un número mayor o igual a 0', 400, "INVALID_PRODUCT_STOCK");
    }
    if (status && !Object.values(PRODUCT_STATUS).includes(status)){
        throw new AppError('El estado del producto no es válido',400, "INVALID_PRODUCT_STATUS");
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
    const product= await productRepository.getById(id);

    if(!product){
        throw new AppError('Producto no encontrado', 404, "PRODUCT_NOT_FOUND");
    }
    return product;
}

module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
};