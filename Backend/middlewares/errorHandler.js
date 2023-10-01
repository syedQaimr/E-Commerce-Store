const ErrorHandler = require("../utils/errorhandler");

const errorHandler = (error , req , res , next) => {

    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Message";

    if(error.name == 'CastError'){
        const message = `Resource Not Found Invalid : ${error.path}`
        err = new ErrorHandler(message,400)
    }

    console.log(error.code)
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} Entered`
        error = new ErrorHandler(message , 400)
    }
    

    return res.status(error.statusCode).json({ success: false, message: error.message });

}

module.exports = errorHandler