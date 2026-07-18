
class AppError extends Error {
    constructor(errorData){
        super(errorData.message);
        this.statusCode= errorData.statusCode;
        this.code= errorData.code;
    }
}
module.exports={AppError};




