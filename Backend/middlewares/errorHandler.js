
const errorHandler = (error , req , res , next) => {

    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Message";
    

    return res.status(error.statusCode).json({ success: false, error: error });

}

module.exports = errorHandler