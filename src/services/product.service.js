const productRepository= require('../repositories/product.repository');
const {PRODUCT_STATUS}= require('../constants');

function createServiceError(message, statusCode){
    const error= new Error(message);
    error.statusCode= statusCode;
    return error;
}

async function createProduct(productData){
    const {name, price,stock=0, status}= productData;

    if(!name || typeof name !== 'string'){
        throw createServiceError('El nombre del producto es obligatorio', 400);
    }
    if (typeof price !== 'number' || price<0){
        throw createServiceError('El orecio debe ser un número mayor o igual a 0',400);
    }
    if(!Number.isInteger(stock) || stock <0){
        throw createServiceError('El stock debe ser un número mayor o igual a 0', 400);
    }
    if (status && !Object.values(PRODUCT_STATUS). includes(status)){
        throw createServiceError('El estado del producto no es válido',400);
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
        throw createServiceError('Producto no encontrado', 400);
    }
    return product;
}

module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
};