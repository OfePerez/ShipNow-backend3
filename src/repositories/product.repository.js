const Product= require('../models/product');

async function create(productData){
    return Product.create(productData);
}

async function getAll(){
    return Product.find({}, {
        __v:0,
    })
    .sort({name:1})
    .lean();
}

async function getById(id){
    return Product.findById(id, {
        __v:0,
    }).lean();
}

module.exports={
    create,
    getAll,
    getById,
};